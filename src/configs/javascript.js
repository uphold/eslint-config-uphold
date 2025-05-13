/**
 * Module dependencies.
 */

import { defineConfig } from 'eslint/config';
import {
  eslintRules,
  jsdocConfig,
  nodePluginConfig,
  promisePluginConfig,
  sortDestructureKeysConfig,
  sortImportsRequiresConfig,
  sortKeysFixConfig,
  sqlTemplateConfig,
  stylisticConfig,
  upholdPluginConfig
} from '../common.js';
import eslint from '@eslint/js';
import globals from 'globals';
import jsdoc from 'eslint-plugin-jsdoc';

/**
 * Uphold JavaScript configuration.
 */

const upholdJavascriptConfig = defineConfig([
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        }
      }
    },
    name: 'uphold/languageOptions'
  },
  {
    extends: [{ ...eslint.configs.recommended, name: 'eslint/recommended' }],
    name: 'uphold/base',
    rules: eslintRules
  },
  {
    ...jsdocConfig,
    rules: {
      ...jsdoc.configs['flat/recommended-error'].rules,
      ...jsdocConfig.rules
    }
  },
  nodePluginConfig,
  promisePluginConfig,
  sortDestructureKeysConfig,
  sortImportsRequiresConfig,
  sortKeysFixConfig,
  sqlTemplateConfig,
  stylisticConfig,
  upholdPluginConfig
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

export default upholdJavascriptConfig;
