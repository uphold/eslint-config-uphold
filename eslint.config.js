'use strict';

/**
 * Module dependencies.
 */

const { defineConfig, globalIgnores } = require('eslint/config');
const uphold = require('./src');

/**
 * `ESLint` configuration.
 */

module.exports = defineConfig([
  {
    extends: [uphold],
    name: 'uphold-config'
  },
  globalIgnores(['!**/.release-it.js', 'test/fixtures'])
]);
