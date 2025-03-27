/**
 * `explicit-sinon-use-fake-timers` rule.
 * - Validates that `sinon.useFakeTimers()` is always called with an explicit `toFake` property.
 *
 * @type {import('eslint').Rule.RuleModule}
 */

const explicitSinonUseFakeTimers = {
  create(context) {
    return {
      CallExpression(node) {
        if (!node.callee || !node.callee.object || !node.callee.property) {
          return;
        }

        const isCalleeSinonUseFakeTimers =
          node.callee.object.name === 'sinon' && node.callee.property.name === 'useFakeTimers';

        if (!isCalleeSinonUseFakeTimers) {
          return;
        }

        const [sinonOptions] = node.arguments;

        if (!sinonOptions) {
          return context.report({ messageId: 'mustPassObject', node });
        }

        const isArgumentObjectExpression = sinonOptions.type === 'ObjectExpression';

        if (!isArgumentObjectExpression) {
          return context.report({ messageId: 'notAnObject', node });
        }

        if (!sinonOptions.properties.find(({ key }) => key && key.name === 'toFake')) {
          return context.report({ messageId: 'objectMustContainToFake', node });
        }
      }
    };
  },
  meta: {
    docs: {
      description:
        'Calls to `sinon.useFakeTimers()` must provide a `toFake` configuration. (e.g. `sinon.useFakeTimers({ toFake: ["Date"] })`)'
    },
    messages: {
      mustPassObject: 'Must pass an object with `toFake` configuration',
      notAnObject: 'Not an object',
      objectMustContainToFake: 'Object must contain `toFake` configuration'
    },
    type: 'problem'
  }
};

/**
 * Export `explicit-sinon-use-fake-timers` rule.
 */

export default explicitSinonUseFakeTimers;
