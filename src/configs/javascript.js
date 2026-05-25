/**
 * Module dependencies.
 */

import {
  defaultEcmaVersion,
  eslintRules,
  jsdocPluginConfigJavaScript,
  nodePluginConfig,
  promisePluginConfig,
  sortDestructureKeysConfig,
  sortImportsRequiresConfig,
  sortKeysFixConfig,
  sqlTemplateConfig,
  stylisticConfig,
  upholdConfigFilesConfig,
  upholdPluginConfig,
  upholdScriptsBinConfig
} from './common.js';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import js from '@eslint/js';

/**
 * Module type to globals mapping.
 */
const moduleTypeToGlobals = {
  commonjs: globals.node,
  module: globals.nodeBuiltin
};

/**
 * Create Uphold JavaScript ESLint configuration.
 * @param {'commonjs' | 'module'} [moduleType='commonjs'] - The module type, defaulting to CommonJS, most common for JavaScript.
 * @param {object} [options] - Additional options for the configuration.
 * @param {import('eslint').Linter.LanguageOptions['ecmaVersion']} [options.ecmaVersion] - The ECMAScript version to use.
 * @returns {import('eslint').Linter.Config[]} Uphold JavaScript ESLint configuration.
 */
export function createJavaScriptConfig(moduleType = 'commonjs', { ecmaVersion = defaultEcmaVersion } = {}) {
  const nodeGlobals = moduleTypeToGlobals[moduleType] || globals.node;

  return defineConfig([
    {
      extends: [js.configs.recommended],
      languageOptions: {
        ecmaVersion,
        globals: nodeGlobals,
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true
          }
        }
      },
      name: `uphold/javascript-${moduleType}`,
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
    upholdConfigFilesConfig,
    upholdScriptsBinConfig,
    // Prettier must be the last config to disable conflicting rules.
    eslintPluginPrettierRecommended,
    // Overrides for Prettier to re-enable `curly`, which is disabled by Prettier's recommended config.
    {
      name: 'uphold/prettier-overrides',
      rules: {
        curly: 'error'
      }
    }
  ]);
}
