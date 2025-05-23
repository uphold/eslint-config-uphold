/**
 * Module dependencies.
 */

import { defineConfig } from 'eslint/config';
import {
  eslintRules,
  jsdocPluginConfigJavaScript,
  nodePluginConfig,
  promisePluginConfig,
  sortDestructureKeysConfig,
  sortImportsRequiresConfig,
  sortKeysFixConfig,
  sqlTemplateConfig,
  stylisticConfig,
  upholdPluginConfig
} from './common.js';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/**
 * Uphold JavaScript configuration.
 */

const upholdJavascriptConfig = defineConfig([
  {
    extends: [{ ...eslint.configs.recommended, name: 'eslint/recommended' }],
    languageOptions: {
      ecmaVersion: 2022,
      /** @todo Resolve globals based on CJS vs ESM. */
      globals: globals.node,
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        }
      }
    },
    name: 'uphold/eslint',
    rules: eslintRules
  },
  jsdocPluginConfigJavaScript,
  nodePluginConfig,
  promisePluginConfig,
  sortDestructureKeysConfig,
  sortImportsRequiresConfig,
  sortKeysFixConfig,
  sqlTemplateConfig,
  stylisticConfig,
  upholdPluginConfig,
  eslintPluginPrettierRecommended
]);

export const upholdBinScriptsConfig = {
  files: ['**/bin/**', '**/scripts/**'],
  name: 'uphold/scripts',
  rules: {
    'no-console': 'off',
    'node-plugin/no-process-exit': 'off'
  }
};

/**
 * Export the configuration.
 */

export { upholdJavascriptConfig as 'module.exports' };
export default upholdJavascriptConfig;
