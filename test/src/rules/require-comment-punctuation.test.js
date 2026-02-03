/**
 * Module dependencies.
 */

import { RuleTester } from 'eslint';
import { describe, it } from 'node:test';
import requireCommentPunctuation from '../../../src/rules/require-comment-punctuation.js';

/**
 * Tests for `require-comment-punctuation` rule.
 */

describe('require-comment-punctuation', () => {
  const ruleTester = new RuleTester();

  it('should validate single-line comments with proper punctuation', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: '// This is a comment without punctuation',
          errors: [{ messageId: 'missingPunctuation' }],
          output: '// This is a comment without punctuation.'
        },
        {
          code: '  // Indented comment without punctuation',
          errors: [{ messageId: 'missingPunctuation' }],
          output: '  // Indented comment without punctuation.'
        },
        {
          code: '\t// Tab-indented comment without punctuation',
          errors: [{ messageId: 'missingPunctuation' }],
          output: '\t// Tab-indented comment without punctuation.'
        }
      ],
      valid: [
        { code: '// This is a comment with a period.' },
        { code: '// Is this a question?' },
        { code: '// Implementation:' },
        { code: '// Another item;' },
        { code: '// This is important!' },
        { code: '// ``` let foo = 1 + 2 ```' },
        { code: '  // Indented comment with period.' },
        { code: '\t// Tab-indented comment with period.' }
      ]
    });
  });

  it('should validate multi-line comment blocks', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: `
            // This is a multi-line comment
            // that spans multiple lines
            // but lacks punctuation`,
          errors: [{ messageId: 'missingPunctuation' }],
          output: `
            // This is a multi-line comment
            // that spans multiple lines
            // but lacks punctuation.`
        },
        {
          code: `
            // First line.
            // Second line
            // Third line without punctuation`,
          errors: [{ messageId: 'missingPunctuation' }],
          output: `
            // First line.
            // Second line
            // Third line without punctuation.`
        }
      ],
      valid: [
        {
          code: `
            // This is a multi-line comment.
            // It spans multiple lines.
            // And ends with proper punctuation.`
        },
        {
          code: `
            // First line?
            // Second line!
            // Third line.`
        },
        {
          code: `
            // Code example:
            // function foo() {
            //   return bar;
            // }.`
        }
      ]
    });
  });

  it('should handle empty comment lines in blocks', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: `
            // Comment with content
            //
            // More content without punctuation`,
          errors: [{ messageId: 'missingPunctuation' }],
          output: `
            // Comment with content
            //
            // More content without punctuation.`
        },
        {
          code: `
            // First line
            //
            // Last line without punctuation`,
          errors: [{ messageId: 'missingPunctuation' }],
          output: `
            // First line
            //
            // Last line without punctuation.`
        }
      ],
      valid: [
        {
          code: `
            // Comment with content.
            //
            // More content with punctuation.`
        }
      ]
    });
  });

  it('should ignore directive comments', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [],
      valid: [
        { code: '// eslint-disable-next-line' },
        { code: '// eslint-disable no-console' },
        { code: '// eslint no-console' },
        { code: '// eslint' },
        { code: '// @ts-ignore' },
        { code: '// @ts-expect-error' },
        { code: '// @ts-nocheck' },
        { code: '// prettier-ignore' },
        { code: '// istanbul ignore next' },
        { code: '// c8 ignore next' },
        { code: '// v8 ignore next' },
        { code: '// global window, document' }
      ]
    });
  });

  it('should handle directives breaking comment blocks', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: `
            // Comment without punctuation
            // @ts-ignore
            const x = 5;
          `,
          errors: [{ messageId: 'missingPunctuation' }],
          output: `
            // Comment without punctuation.
            // @ts-ignore
            const x = 5;
          `
        },
        {
          code: `
            const x = 5;
            // prettier-ignore
            // Another comment without punctuation`,
          errors: [{ messageId: 'missingPunctuation' }],
          output: `
            const x = 5;
            // prettier-ignore
            // Another comment without punctuation.`
        }
      ],
      valid: [
        {
          code: `
            // Comment with punctuation.
            // @ts-ignore
            const x = 5;`
        },
        {
          code: `
            const x = 5;
            // prettier-ignore
            // Another comment with punctuation.`
        }
      ]
    });
  });

  it('should validate inline comments individually', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: 'const x = 5; // inline comment without punctuation',
          errors: [{ messageId: 'missingPunctuation' }],
          output: 'const x = 5; // inline comment without punctuation.'
        },
        {
          code: 'function foo() {} // function comment',
          errors: [{ messageId: 'missingPunctuation' }],
          output: 'function foo() {} // function comment.'
        }
      ],
      valid: [
        { code: 'const x = 5; // inline comment with period.' },
        { code: 'function foo() {} // function comment.' }
      ]
    });
  });

  it('should not group full-line and inline comments together', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: `
            // Full-line comment
            const x = 5; // inline comment`,
          errors: [{ messageId: 'missingPunctuation' }, { messageId: 'missingPunctuation' }],
          output: `
            // Full-line comment.
            const x = 5; // inline comment.`
        }
      ],
      valid: [
        {
          code: `
            // Full-line comment.
            const x = 5; // inline comment.`
        }
      ]
    });
  });

  it('should handle comments with trailing whitespace', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: '// Comment without punctuation   ',
          errors: [{ messageId: 'missingPunctuation' }],
          output: '// Comment without punctuation.   '
        },
        {
          code: '// Comment without punctuation\t\t',
          errors: [{ messageId: 'missingPunctuation' }],
          output: '// Comment without punctuation.\t\t'
        }
      ],
      valid: [{ code: '// Comment with punctuation.   ' }, { code: '// Comment with punctuation.\t' }]
    });
  });

  it('should handle all allowed punctuation marks', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: '// Statement without punctuation',
          errors: [{ messageId: 'missingPunctuation' }],
          output: '// Statement without punctuation.'
        },
        {
          code: '// example: ``` function foo() { return bar; } ``` function',
          errors: [{ messageId: 'missingPunctuation' }],
          output: '// example: ``` function foo() { return bar; } ``` function.'
        },
        {
          code: '// const total = 1 + 2 ```',
          errors: [{ messageId: 'unpairedBackticks' }]
        },
        {
          code: '// Unpaired ``` triple ```const backticks = 1 + 2 ```',
          errors: [{ messageId: 'unpairedBackticks' }]
        }
      ],
      valid: [
        { code: '// Statement with period.' },
        { code: '// Label:' },
        { code: '// Question?' },
        { code: '// Exclamation!' },
        { code: '// Statement with semicolon;' },
        { code: '// ``` const total = 1 + 2 ```' },
        { code: '// example: ``` function foo() { return bar; } ``` function.' },
        { code: '// Multiple paired ``` const foo=1 ``` triple backticks ``` const bar=2```' }
      ]
    });
  });

  it('should handle non-adjacent full-line comments as separate blocks', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: `
            // First comment

            // Second comment`,
          errors: [{ messageId: 'missingPunctuation' }, { messageId: 'missingPunctuation' }],
          output: `
            // First comment.

            // Second comment.`
        },
        {
          code: `
            // First comment
            const x = 5;
            // Second comment`,
          errors: [{ messageId: 'missingPunctuation' }, { messageId: 'missingPunctuation' }],
          output: `
            // First comment.
            const x = 5;
            // Second comment.`
        }
      ],
      valid: [
        {
          code: `
            // First comment.

            // Second comment.`
        }
      ]
    });
  });

  it('should handle comments ending with different punctuation', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: '// This ends with a comma,',
          errors: [{ messageId: 'missingPunctuation' }],
          output: '// This ends with a comma.'
        }
      ],
      valid: [{ code: '// This ends with a colon:' }]
    });
  });

  it('should handle real-world comment scenarios', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: `
            // Calculate the sum of two numbers
            function add(a, b) {
              return a + b;
            }`,
          errors: [{ messageId: 'missingPunctuation' }],
          output: `
            // Calculate the sum of two numbers.
            function add(a, b) {
              return a + b;
            }`
        },
        {
          code: `
            // TODO: Implement this feature
            // Priority: High
            // Assignee: John`,
          errors: [{ messageId: 'missingPunctuation' }],
          output: `
            // TODO: Implement this feature
            // Priority: High
            // Assignee: John.`
        }
      ],
      valid: [
        {
          code: `
            // Calculate the sum of two numbers.
            function add(a, b) {
              return a + b;
            }`
        },
        {
          code: `
            // TODO: Implement this feature.
            // Priority: High.
            // Assignee: John.`
        }
      ]
    });
  });

  it('should handle edge cases', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: '// A',
          errors: [{ messageId: 'missingPunctuation' }],
          output: '// A.'
        },
        {
          code: '// 123',
          errors: [{ messageId: 'missingPunctuation' }],
          output: '// 123.'
        }
      ],
      valid: [{ code: '//' }, { code: '//   ' }, { code: '// .' }, { code: '// ?' }, { code: '// !' }, { code: '// ;' }]
    });
  });

  it('should handle comments in code contexts', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: `
            function example() {
              // This is a local comment
              const x = 5;
              return x;
            }`,
          errors: [{ messageId: 'missingPunctuation' }],
          output: `
            function example() {
              // This is a local comment.
              const x = 5;
              return x;
            }`
        }
      ],
      valid: [
        {
          code: `
            function example() {
              // This is a local comment.
              const x = 5;
              return x;
            }`
        }
      ]
    });
  });

  it('should support `exclusionPrefixes` option', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: '// Regular comment without punctuation',
          errors: [{ messageId: 'missingPunctuation' }],
          options: [{ exclusionPrefixes: ['TODO:', 'FIXME:'] }],
          output: '// Regular comment without punctuation.'
        }
      ],
      valid: [
        {
          code: '// TODO: implement this feature',
          options: [{ exclusionPrefixes: ['TODO:', 'FIXME:'] }]
        },
        {
          code: '// FIXME: this is broken',
          options: [{ exclusionPrefixes: ['TODO:', 'FIXME:'] }]
        },
        {
          code: '// NOTE: important info',
          options: [{ exclusionPrefixes: ['NOTE:'] }]
        },
        {
          code: `
            // TODO: first task
            // FIXME: second task`,
          options: [{ exclusionPrefixes: ['TODO:', 'FIXME:'] }]
        }
      ]
    });
  });

  it('should handle `exclusionPrefixes` breaking comment blocks', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: `
            // Comment without punctuation
            // TODO: implement this`,
          errors: [{ messageId: 'missingPunctuation' }],
          options: [{ exclusionPrefixes: ['TODO:'] }],
          output: `
            // Comment without punctuation.
            // TODO: implement this`
        }
      ],
      valid: [
        {
          code: `
            // Comment with punctuation.
            // TODO: implement this`,
          options: [{ exclusionPrefixes: ['TODO:'] }]
        }
      ]
    });
  });

  it('should support `additionalAllowedEndings` option', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: '// Comment without allowed ending',
          errors: [{ messageId: 'missingPunctuation' }],
          options: [{ additionalAllowedEndings: ['%'] }],
          output: '// Comment without allowed ending.'
        }
      ],
      valid: [
        {
          code: '// Comment ending with percent 100%',
          options: [{ additionalAllowedEndings: ['%'] }]
        },
        {
          code: '// Comment ending with a parenthesis)',
          options: [{ additionalAllowedEndings: [')', '%'] }]
        },
        {
          code: '// Still valid with period.',
          options: [{ additionalAllowedEndings: ['&'] }]
        },
        {
          code: '// Still valid with question?',
          options: [{ additionalAllowedEndings: ['&'] }]
        }
      ]
    });
  });

  it('should support both options together', () => {
    ruleTester.run('require-comment-punctuation', requireCommentPunctuation, {
      invalid: [
        {
          code: '// Regular comment',
          errors: [{ messageId: 'missingPunctuation' }],
          options: [{ additionalAllowedEndings: ['%'], exclusionPrefixes: ['TODO:'] }],
          output: '// Regular comment.'
        }
      ],
      valid: [
        {
          code: '// TODO: implement this',
          options: [{ additionalAllowedEndings: ['%'], exclusionPrefixes: ['TODO:'] }]
        },
        {
          code: '// Comment ending with percent %',
          options: [{ additionalAllowedEndings: ['%'], exclusionPrefixes: ['TODO:'] }]
        },
        {
          code: '// Comment with period.',
          options: [{ additionalAllowedEndings: ['%'], exclusionPrefixes: ['TODO:'] }]
        }
      ]
    });
  });
});
