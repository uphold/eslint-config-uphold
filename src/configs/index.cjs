/**
 * CommonJS wrapper for configs.
 */

module.exports = {
  get javascript() {
    const { createJavaScriptConfig } = require('./javascript.js');

    return createJavaScriptConfig('commonjs');
  },

  get typescript() {
    const { createTypeScriptConfig } = require('./typescript.js');

    return createTypeScriptConfig('commonjs');
  }
};
