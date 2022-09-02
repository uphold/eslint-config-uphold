'use strict';

// ------------------------------------------------------------------------------
// Validates that `sinon.useFakeTimers()` is always called with an explicit `toFake` property.
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    messages: {
      avoidName: 'Calls to `sinon.useFakeTimers()` must provide a `toFake` configuration'
    }
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  create(context) {
    return {
      CallExpression(node) {
        if (!node.callee || !node.callee.object || !node.callee.property) {
          return;
        }

        if (node.callee.object.name === 'sinon' && node.callee.property.name === 'useFakeTimers') {
          if (!node.arguments.length) {
            context.report({
              message: 'Must pass an object with `toFake` configuration',
              node
            });
          }

          for (const argument of node.arguments) {
            if (argument.type === 'ObjectExpression') {
              if (!argument.properties.find(({ key: { name } }) => name === 'toFake')) {
                context.report({
                  message: 'Object must contain `toFake` configuration',
                  node
                });
              }

              continue;
            }

            context.report({
              message: 'Not an object',
              node
            });
          }
        }
      }
    };
  }
};
