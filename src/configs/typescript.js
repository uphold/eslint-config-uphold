/**
 * Module dependencies.
 */

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
import tseslint from 'typescript-eslint';

/**
 * Uphold TypeScript configuration.
 */

const upholdTypescriptConfig = tseslint.config([
  {
    extends: [{ ...eslint.configs.recommended, name: 'eslint/recommended' }],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        tsconfigRootDir: './'
      }
    },
    name: 'upholdTs/languageOptions'
  },
  {
    extends: [tseslint.configs.eslintRecommended, tseslint.configs.recommended],
    name: 'upholdTs/base',
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...eslintRules
    }
  },
  {
    name: 'upholdTs/jsdoc',
    plugins: {
      jsdoc
    },
    rules: {
      ...jsdoc.configs['flat/recommended-typescript-error'].rules,
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

/**
 * Export the configuration.
 */

export default upholdTypescriptConfig;
