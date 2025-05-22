/**
 * Module dependencies.
 */

const jest = require('./jest.js');
const mocha = require('./mocha.js');
const vitest = require('./vitest.js');

/**
 * CommonJS wrapper for configs.
 */

module.exports = {
  jest,
  mocha,
  vitest
};
