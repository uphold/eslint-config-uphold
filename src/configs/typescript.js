/**
 * Module dependencies.
 */

import { defineConfig } from 'eslint/config';
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
import { isModuleAvailable, loadModule } from '../utils/load-module.js';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

/**
 * @typedef {object} LoaderUtils
 * @property {(moduleName: string) => boolean} isModuleAvailable - Check if a module is available.
 * @property {(moduleName: string) => Promise<unknown>} [loadModule] - Dynamically load a module.
 */

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
 * @param {LoaderUtils} [utils] - Optional utilities for dependency injection (for testing).
 * @returns {Promise<import('eslint').Linter.Config[]>} Uphold TypeScript ESLint configuration.
 */
export async function createTypeScriptConfig(moduleType = 'module', utils) {
  const checkModule = utils?.isModuleAvailable ?? isModuleAvailable;
  const loadMod = utils?.loadModule ?? loadModule;
  const configNameSuffix = moduleType === 'commonjs' ? 'cjs' : 'mjs';
  const nodeGlobals = moduleType === 'commonjs' ? globals.node : globals.nodeBuiltin;

  if (checkModule('typescript-eslint')) {
    /** @type {import('typescript-eslint').default} */
    const tseslint = await loadMod('typescript-eslint');

    return defineConfig([
      {
        extends: [{ ...eslint.configs.recommended, name: 'eslint/recommended' }, tseslint.configs.recommended],
        files: ['**/*.cts', '**/*.d.ts', '**/*.mts', '**/*.ts', '**/*.tsx'],
        languageOptions: {
          ecmaVersion: 'latest',
          globals: nodeGlobals,
          parser: tseslint.parser,
          parserOptions: {
            projectService: true
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

  console.warn('`typescript-eslint` not installed. Falling back to ESLint for TypeScript linting');

  return defineConfig([
    {
      files: ['**/*.cts', '**/*.d.ts', '**/*.mts', '**/*.ts', '**/*.tsx'],
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
