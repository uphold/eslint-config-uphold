/**
 * Module dependencies.
 */

import {
  eslintRules,
  jsdocPluginConfigTypeScript,
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
import { isModuleAvailable } from '../utils/load-module.js';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/**
 * Check if `typescript-eslint` is available.
 */

const isTypescriptEslintAvailable = isModuleAvailable('typescript-eslint');

/**
 * Common configs for both `typescript-eslint` and `ESLint`.
 */

const commonConfigs = [
  jsdocPluginConfigTypeScript,
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
];

/**
 * Create Uphold TypeScript ESLint config.
 * @param {'commonjs' | 'module'} [moduleType] - The module type.
 * @returns {Promise<import('eslint').Linter.Config[]|import('typescript-eslint').ConfigArray>} Uphold TypeScript ESLint configuration.
 */
export async function createTypeScriptConfig(moduleType = 'commonjs') {
  const configNameSuffix = moduleType === 'commonjs' ? 'cjs' : 'mjs';
  const nodeGlobals = moduleType === 'commonjs' ? globals.node : globals.nodeBuiltin;

  if (isTypescriptEslintAvailable) {
    const tseslint = await import('typescript-eslint');

    return tseslint.config([
      {
        extends: [{ ...eslint.configs.recommended, name: 'eslint/recommended' }, tseslint.configs.recommended],
        languageOptions: {
          ecmaVersion: 'latest',
          globals: nodeGlobals,
          parser: tseslint.parser,
          parserOptions: {
            tsconfigRootDir: './'
          }
        },
        name: `uphold/typescript-eslint-${configNameSuffix}`,
        plugins: {
          '@typescript-eslint': tseslint.plugin
        },
        rules: {
          ...eslintRules,
          '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_.+' }],
          'no-unused-expressions': 'off',
          'no-unused-vars': 'off'
        }
      },
      ...commonConfigs
    ]);
  }
  // eslint-disable-next-line no-console
  console.warn('`typescript-eslint` not installed. Falling back to ESLint for TypeScript linting.');

  const { defineConfig } = await import('eslint/config');

  return defineConfig([
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
      languageOptions: {
        ecmaVersion: 2022,
        globals: nodeGlobals,
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true
          }
        }
      },
      name: `uphold/typescript-compat-${configNameSuffix}`
    },
    ...commonConfigs
  ]);
}
