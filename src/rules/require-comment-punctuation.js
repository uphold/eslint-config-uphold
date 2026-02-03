/**
 * @typedef {import('estree').Comment} Comment
 * @typedef {Comment & { range: [number, number], loc: import('estree').SourceLocation }} CommentWithRange
 * @typedef {{
 *   comment: CommentWithRange,
 *   isDirective: boolean,
 *   isExcluded: boolean,
 *   isFullLine: boolean,
 *   valueTrimmed: string
 * }} CommentInfo
 */

/**
 * Constants.
 */

// Allowed endings for the last line in a `//` comment block.
const ALLOWED_ENDINGS = Object.freeze(['.', ':', ';', '?', '!', '```']);

// Directive prefixes that have semantic meaning and should not be style-linted.
const DIRECTIVE_PREFIXES = Object.freeze([
  '@ts-',
  'c8 ',
  'eslint ',
  'eslint-',
  'global ',
  'istanbul ',
  'prettier-ignore',
  'v8 '
]);

/**
 * Has Paired Triple Backticks.
 * @param {string} trimmedEnd The comment text trimmed only on the right side.
 * @returns {boolean} True if the comment contains at least two instances of ```, and they're a multiple of two.
 */
function hasPairedTripleBackticks(trimmedEnd) {
  const matches = trimmedEnd.match(/```/g);

  return Boolean(matches && matches.length >= 2 && matches.length % 2 === 0);
}

/**
 * Ends with Allowed Punctuation.
 * @param {string} trimmedEnd The comment text trimmed only on the right side.
 * @param {string[]} allowedEndings The list of allowed endings.
 * @returns {boolean} True if the trimmed comment text ends with allowed punctuation.
 */
function endsWithAllowedPunctuation(trimmedEnd, allowedEndings) {
  return allowedEndings.some(ending => {
    if (ending === '```') {
      return trimmedEnd.endsWith(ending) && hasPairedTripleBackticks(trimmedEnd);
    }

    return trimmedEnd.endsWith(ending);
  });
}

// Pre-compile frequently used regexes to avoid repeated allocation.
const PUNCT_RE = new RegExp(/[^\w\s]/);

/**
 * Is Punctuation Character.
 * @param {string|undefined} ch The character to check.
 * @returns {boolean} True if the character is a punctuation character.
 */
function isPunctuationChar(ch) {
  return !!ch && PUNCT_RE.test(ch);
}

/**
 * Is Directive Comment.
 * - These comments have semantic meaning and should not be style-linted.
 * @param {string} trimmed Comment text with whitespace trimmed on both ends.
 * @returns {boolean} Returns true if this comment is an ESLint/TS/prettier/coverage directive.
 */
function isDirectiveComment(trimmed) {
  if (!trimmed) {
    return false;
  }

  if (trimmed === 'eslint') {
    return true;
  }

  return DIRECTIVE_PREFIXES.some(prefix => trimmed.startsWith(prefix));
}

/**
 * Is Full-Line Comment.
 * (i.e. it is a full-line comment, not a trailing inline comment).
 * @param {import('eslint').SourceCode} sourceCode The ESLint source code object.
 * @param {CommentWithRange} comment The comment token.
 * @returns {boolean} True if the comment starts at the first non-whitespace character of the line.
 */
function isFullLineComment(sourceCode, comment) {
  const line = sourceCode.lines[comment.loc.start.line - 1] || '';
  const before = line.slice(0, comment.loc.start.column);

  return /^[\t ]*$/.test(before);
}

/**
 * Is Line Comment With Range.
 * @param {Comment} comment The comment token.
 * @returns {comment is CommentWithRange} True if the comment is a line comment with range/loc metadata.
 */
function isLineCommentWithRange(comment) {
  return comment.type === 'Line' && Boolean(comment.range && comment.loc);
}

/**
 * Normalize rule options.
 * @param {{ exclusionPrefixes?: string[], additionalAllowedEndings?: string[] }} rawOptions The raw options.
 * @returns {{ exclusionPrefixes: string[], allowedEndings: string[] }} Normalized options.
 */
function normalizeOptions(rawOptions) {
  const exclusionPrefixes = rawOptions.exclusionPrefixes || [];
  const additionalAllowedEndings = rawOptions.additionalAllowedEndings || [];
  const allowedEndings = [...ALLOWED_ENDINGS, ...additionalAllowedEndings];

  return { allowedEndings, exclusionPrefixes };
}

/**
 * Get Index to Insert Period Before Trailing Whitespace.
 * - Compute where to insert a period so it lands before trailing whitespace.
 * @param {import('eslint').SourceCode} sourceCode The ESLint source code object.
 * @param {CommentWithRange} comment The comment token.
 * @returns {number} The index in sourceCode.text where the period should be inserted.
 */
function getInsertIndexBeforeTrailingWhitespace(sourceCode, comment) {
  const raw = sourceCode.text.slice(comment.range[0], comment.range[1]);
  const trailingWhitespace = raw.match(/\s*$/)?.[0].length || 0;

  return comment.range[1] - trailingWhitespace;
}

/**
 * `require-comment-punctuation` ESLint rule definition.
 * @type {import('eslint').Rule.RuleModule}
 */
const requireCommentPunctuation = {
  create(context) {
    const { sourceCode } = context;
    /** @type {{ exclusionPrefixes?: string[], additionalAllowedEndings?: string[] }} */
    const rawOptions = context.options[0] || {};
    const { allowedEndings, exclusionPrefixes } = normalizeOptions(rawOptions);
    const allowedEndingsText = [...new Set(allowedEndings)].join(', ');

    /**
     * Check if comment should be excluded based on exclusion prefixes.
     * @param {string} trimmed The trimmed comment text.
     * @returns {boolean} True if comment should be excluded.
     */
    function isExcludedComment(trimmed) {
      return exclusionPrefixes.some(prefix => trimmed.startsWith(prefix));
    }

    /**
     * Decide if two comments should be grouped into the same block.
     * @param {CommentInfo} previousInfo The previous comment info.
     * @param {CommentInfo} nextInfo The next comment info.
     * @returns {boolean} True if the comments should be grouped.
     */
    function shouldJoinBlock(previousInfo, nextInfo) {
      const adjacentLine = nextInfo.comment.loc.start.line === previousInfo.comment.loc.end.line + 1;

      return adjacentLine && previousInfo.isFullLine && nextInfo.isFullLine;
    }

    /**
     * Find the last non-empty comment in a block.
     * @param {CommentInfo[]} block The block of line comments to check.
     * @returns {CommentInfo | null} The last meaningful comment, or null.
     */
    function findLastMeaningfulInfo(block) {
      /** @type {CommentInfo | null} */
      let lastMeaningful = null;

      for (const info of block) {
        // should not happen; directives break blocks.
        if (info.isDirective || info.isExcluded) {
          return null;
        }

        if (info.valueTrimmed.length > 0) {
          lastMeaningful = info;
        }
      }

      return lastMeaningful;
    }

    /**
     * Check Block for punctuation.
     * - Enforce punctuation on the last *meaningful* line of the block.
     * - If the block ends with blank `//` lines, we skip those and check the
     * last non-empty comment.
     * @param {CommentInfo[]} block The block of line comments to check.
     */
    function checkBlock(block) {
      if (!block.length) {
        return;
      }

      const lastMeaningful = findLastMeaningfulInfo(block);

      if (!lastMeaningful) {
        return;
      }

      // Compute right-trimmed value lazily to avoid unnecessary work.
      const trimmedEnd = lastMeaningful.comment.value.trimEnd();

      if (endsWithAllowedPunctuation(trimmedEnd, allowedEndings)) {
        return;
      }

      if (trimmedEnd.endsWith('```') && !hasPairedTripleBackticks(trimmedEnd)) {
        context.report({
          loc: lastMeaningful.comment.loc,
          messageId: 'unpairedBackticks'
        });

        return;
      }

      context.report({
        data: { allowedEndings: allowedEndingsText },
        fix(fixer) {
          const insertAt = getInsertIndexBeforeTrailingWhitespace(sourceCode, lastMeaningful.comment);

          // Attempt to replace a single trailing disallowed punctuation mark
          // (e.g. `,`) with a period instead of appending, to avoid outputs
          // like `comma,.`. We only replace when the last non-whitespace
          // character is a single punctuation character (not part of a
          // multi-character punctuation like `..` or triple backticks).
          const lastNonWsIndex = insertAt - 1;
          const lastChar = sourceCode.text.charAt(lastNonWsIndex);
          const prevChar = sourceCode.text.charAt(lastNonWsIndex - 1);
          const lastCharIsSinglePunctuation = isPunctuationChar(lastChar) && !isPunctuationChar(prevChar);

          // If it's a single backtick we avoid replacing because triple
          // backtick handling is done separately above.
          if (lastCharIsSinglePunctuation && lastChar !== '`') {
            return fixer.replaceTextRange([lastNonWsIndex, insertAt], '.');
          }

          return fixer.insertTextBeforeRange([insertAt, insertAt], '.');
        },
        loc: lastMeaningful.comment.loc,
        messageId: 'missingPunctuation'
      });
    }

    return {
      Program() {
        /** @type {CommentWithRange[]} */
        const lineComments = sourceCode.getAllComments().filter(isLineCommentWithRange);

        /** @type {CommentInfo[]} */
        const commentInfos = lineComments.map(comment => {
          const valueTrimmed = comment.value.trim();

          return {
            comment,
            isDirective: isDirectiveComment(valueTrimmed),
            isExcluded: isExcludedComment(valueTrimmed),
            isFullLine: isFullLineComment(sourceCode, comment),
            valueTrimmed
          };
        });

        /** @type {CommentInfo[]} */
        let currentBlock = [];

        for (const info of commentInfos) {
          // Directives and excluded comments are always their own "block" and are ignored.
          if (info.isDirective || info.isExcluded) {
            checkBlock(currentBlock);
            currentBlock = [];
            continue;
          }

          if (currentBlock.length === 0) {
            currentBlock.push(info);
            continue;
          }

          const previousInfo = currentBlock[currentBlock.length - 1];

          // Only group full-line comments. Trailing inline comments are checked individually.
          if (shouldJoinBlock(previousInfo, info)) {
            currentBlock.push(info);
          } else {
            checkBlock(currentBlock);
            currentBlock = [info];
          }
        }

        checkBlock(currentBlock);
      }
    };
  },
  meta: {
    docs: {
      description: 'Require `//` comment blocks to end with punctuation on the last line.'
    },
    fixable: 'code',
    messages: {
      missingPunctuation: 'Line comment must end with one of: {{allowedEndings}}.',
      unpairedBackticks: 'Line comment ends with unpaired triple backticks (```).'
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          additionalAllowedEndings: {
            description: 'Additional endings to allow beyond the defaults (., :, ;, ?, !, ```).',
            items: { type: 'string' },
            type: 'array'
          },
          exclusionPrefixes: {
            description: 'Comments starting with these strings (after `//`) are excluded from the rule.',
            items: { type: 'string' },
            type: 'array'
          }
        },
        type: 'object'
      }
    ],
    type: 'suggestion'
  }
};

/**
 * Export `require-comment-punctuation` rule.
 */

export default requireCommentPunctuation;
