/**
 * Constants.
 */

const defaultLogMethods = ['debug', 'error', 'info', 'log', 'trace', 'warn'];

/**
 * `no-trailing-period-in-log-messages` rule.
 *
 * Disallows trailing periods in log messages, except for ellipsis (`...`).
 * Supports various access patterns: dot notation, bracket notation, destructured methods,
 * and messages as second argument after context objects.
 * @type {import('eslint').Rule.RuleModule}
 */
const noTrailingPeriodInLogMessages = {
  create(context) {
    const options = context.options[0] || {};
    const additionalMethods = options.additionalMethods || [];
    const logMethods = [...defaultLogMethods, ...additionalMethods];
    const methodNameVariables = new Map();
    const renamedMethods = new Map();

    /**
     * Checks if string ends with invalid trailing periods.
     * @param {string} str - String to check.
     * @returns {boolean} True if has invalid trailing periods.
     */
    function hasInvalidTrailingPeriods(str) {
      const match = str.match(/(\.+)$/);

      return match ? match[1] !== '...' : false;
    }

    /**
     * Normalizes trailing periods in a string.
     * @param {string} str - String to fix.
     * @returns {string} Fixed string with periods removed or normalized to `...`.
     */
    function fixTrailingPeriods(str) {
      const match = str.match(/^(.*?)(\.+)$/);

      if (!match) {
        return str;
      }

      const [, base, dots] = match;

      return dots.length === 1 ? base : `${base}...`;
    }

    /**
     * Reports a message argument if it has invalid trailing periods.
     * @param {import('eslint').Rule.Node} node - Call expression node.
     * @param {import('estree').Node} arg - Argument node to check.
     */
    function checkAndReportMessage(node, arg) {
      if (arg.type === 'Literal' && typeof arg.value === 'string' && hasInvalidTrailingPeriods(arg.value)) {
        context.report({
          fix(fixer) {
            if (!arg.raw) {
              return null;
            }

            const [quote] = arg.raw;
            const content = arg.raw.slice(1, -1);
            const fixed = `${quote}${fixTrailingPeriods(content)}${quote}`;

            return fixer.replaceText(arg, fixed);
          },
          messageId: 'noTrailingPeriod',
          node: arg
        });

        return;
      }

      if (arg.type === 'TemplateLiteral') {
        const lastQuasi = arg.quasis[arg.quasis.length - 1];

        if (hasInvalidTrailingPeriods(lastQuasi.value.raw)) {
          context.report({
            fix(fixer) {
              if (!lastQuasi.range) {
                return null;
              }

              const fixed = fixTrailingPeriods(lastQuasi.value.raw);
              const start = lastQuasi.range[0] + 1;
              const end = lastQuasi.range[1] - 1;

              return fixer.replaceTextRange([start, end], fixed);
            },
            messageId: 'noTrailingPeriod',
            node: arg
          });
        }
      }
    }

    /**
     * Extracts the log method name from a callee node.
     * @param {import('estree').Node} callee - Callee node to analyze.
     * @returns {string|null} Method name if it's a log method, null otherwise.
     */
    function getLogMethodName(callee) {
      if (callee.type === 'MemberExpression') {
        const { computed, property } = callee;

        if (property.type === 'Identifier') {
          return computed ? methodNameVariables.get(property.name) || null : property.name;
        }

        if (property.type === 'Literal' && typeof property.value === 'string') {
          return property.value;
        }
      }

      if (callee.type === 'Identifier') {
        return renamedMethods.get(callee.name) || (logMethods.includes(callee.name) ? callee.name : null);
      }

      return null;
    }

    /**
     * Tracks variables that store method names and destructured method renames.
     * @param {import('estree').VariableDeclarator} node - Variable declarator node.
     */
    function trackMethodVariables(node) {
      if (
        node.id.type === 'Identifier' &&
        node.init?.type === 'Literal' &&
        typeof node.init.value === 'string' &&
        logMethods.includes(node.init.value)
      ) {
        methodNameVariables.set(node.id.name, node.init.value);
      }

      if (node.id.type === 'ObjectPattern') {
        for (const property of node.id.properties) {
          if (
            property.type === 'Property' &&
            property.key.type === 'Identifier' &&
            property.value.type === 'Identifier' &&
            logMethods.includes(property.key.name)
          ) {
            renamedMethods.set(property.value.name, property.key.name);
          }
        }
      }
    }

    return {
      CallExpression(node) {
        const methodName = getLogMethodName(node.callee);

        if (!methodName || !logMethods.includes(methodName)) {
          return;
        }

        const [firstArg, secondArg] = node.arguments;

        if (!firstArg) {
          return;
        }

        checkAndReportMessage(node, firstArg);

        if (secondArg && firstArg.type === 'ObjectExpression') {
          checkAndReportMessage(node, secondArg);
        }
      },

      VariableDeclarator(node) {
        trackMethodVariables(node);
      }
    };
  },
  meta: {
    docs: {
      description: 'Disallow trailing periods in log messages (except for "...")'
    },
    fixable: 'code',
    messages: {
      noTrailingPeriod: 'Log messages should not end with a period, except for "...".'
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          additionalMethods: {
            description: 'Additional method names to check (e.g., ["verbose", "success"])',
            items: {
              type: 'string'
            },
            type: 'array',
            uniqueItems: true
          }
        },
        type: 'object'
      }
    ],
    type: 'suggestion'
  }
};

/**
 * Export `no-trailing-period-in-log-messages` rule.
 */

export default noTrailingPeriodInLogMessages;
