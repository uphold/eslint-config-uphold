'use strict';

//------------------------------------------------------------------------------
// Validates that `sinon.useFakeTimers()` is always called with an explicit `toFake` property.
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    messages: {
      avoidName: "Calls to `sinon.useFakeTimers()` must provide a `toFake` configuration"
    }
  },
  create(context) {
    return {
      CallExpression(node) {
        if (!node.callee || !node.callee.object || !node.callee.property) {
          return;
        }

        if (node.callee.object.name === 'sinon' && node.callee.property.name === 'useFakeTimers') {
          if (!node.arguments.length) {
            context.report({
              node,
              message: 'Must pass an object with `toFake` configuration'
            });
          }

          for (const argument of node.arguments) {
            if (argument.type === 'ObjectExpression') {
              if (!argument.properties.find(({ key: { name } }) => name === 'toFake')) {
                context.report({
                  node,
                  message: 'Object must contain `toFake` configuration'
                });
              }

              continue;
            }

            context.report({
              node,
              message: 'Not an object'
            });
          }
        }
      }
    };

  }
};
