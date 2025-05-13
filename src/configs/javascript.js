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
  upholdPluginConfig,
  upholdScriptsBinConfig
} from './common.js';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/**
 * Create Uphold JavaScript ESLint configuration.
 * @param {'commonjs' | 'module'} [moduleType='commonjs'] - The module type.
 * @returns {import('eslint').Linter.FlatConfig[]} Uphold JavaScript ESLint configuration.
 */
export function createJavaScriptConfig(moduleType = 'commonjs') {
  const configNameSuffix = moduleType === 'commonjs' ? 'cjs' : 'mjs';
  const nodeGlobals = moduleType === 'commonjs' ? globals.node : globals.nodeBuiltin;

  return defineConfig([
    {
      extends: [{ ...eslint.configs.recommended, name: 'eslint/recommended' }],
      languageOptions: {
        ecmaVersion: 'latest',
        globals: nodeGlobals,
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true
          }
        }
      },
      name: `uphold/javascript-${configNameSuffix}`,
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
    upholdScriptsBinConfig,
    eslintPluginPrettierRecommended
  ]);
}
