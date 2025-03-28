/**
 * Module dependencies.
 *
 * @typedef {import('eslint').Linter.Config} LinterConfig
 */

import { defineConfig } from 'eslint/config';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';
import upholdBaseConfig from './base.js';

/**
 * Configuration for bin and scripts files.
 *
 * @type {LinterConfig}
 */

const upholdBinScriptsConfig = {
  files: ['**/bin/**', '**/scripts/**'],
  name: 'uphold/scripts',
  rules: {
    'no-console': 'off',
    'node-plugin/no-process-exit': 'off'
  }
};

/**
 * Shared configuration preset for `node`.
 */

const upholdNode = defineConfig([
  {
    extends: [upholdBaseConfig, upholdBinScriptsConfig],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.jasmine,
        ...globals.jest,
        ...globals.mocha,
        ...globals.node
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false
      },
      sourceType: 'module'
    },
    name: 'uphold/node'
  }
]);

/**
 * Export the configuration.
 *
 * @see https://nodejs.org/docs/latest-v22.x/api/modules.html#loading-ecmascript-modules-using-require
 */

export { upholdNode as 'module.exports' };
export default upholdNode;
