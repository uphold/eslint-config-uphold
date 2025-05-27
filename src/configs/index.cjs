/**
 * Module dependencies.
 */

const jest = require('./jest.js');
const mocha = require('./mocha.js');
const react = require('./react.js');
const vitest = require('./vitest.js');

/**
 * CommonJS wrapper for configs.
 */

module.exports = {
  get javascript() {
    const { createJavaScriptConfig } = require('./javascript.js');

    return createJavaScriptConfig('commonjs');
  },
  jest,
  mocha,
  react,
  get typescript() {
    const { createTypeScriptConfig } = require('./typescript.js');

    return createTypeScriptConfig('commonjs');
  },
  vitest
};
