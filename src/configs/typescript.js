/**
 * Module dependencies.
 */

import {
  defaultEcmaVersion,
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
import { defineConfig } from 'eslint/config';
import { isModuleAvailable, loadModule } from '../utils/load-module.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import js from '@eslint/js';

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
  // Prettier must be the last config to disable conflicting rules.
  eslintPluginPrettierRecommended
];

/**
 * Module type to globals mapping.
 */
const moduleTypeToGlobals = {
  commonjs: globals.node,
  module: globals.nodeBuiltin
};

/**
 * Build fallback config using ESLint only.
 * @param {object} [options] - Additional options for the configuration.
 * @param {import('eslint').Linter.LanguageOptions['ecmaVersion']} [options.ecmaVersion] - The ECMAScript version to use.
 * @param {'commonjs' | 'module'} [options.moduleType='module'] - The module type, defaulting to ECMAScript modules, most common for TypeScript.
 * @param {import('eslint').Linter.LanguageOptions['globals']} [options.nodeGlobals=globals.nodeBuiltin] - The globals to use for Node.js.
 * @returns {import('eslint').Linter.Config[]} The fallback ESLint config for TypeScript.
 */
const buildFallbackConfig = ({
  ecmaVersion = defaultEcmaVersion,
  moduleType = 'module',
  nodeGlobals = globals.nodeBuiltin
} = {}) => {
  return defineConfig([
    {
      extends: [
        {
          ...js.configs.recommended,
          name: 'eslint/recommended'
        }
      ],
      files: ['**/*.cts', '**/*.d.ts', '**/*.mts', '**/*.ts', '**/*.tsx'],
      languageOptions: {
        ecmaVersion,
        globals: nodeGlobals,
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true
          }
        }
      },
      name: `uphold/typescript-compat-${moduleType}`,
      rules: eslintRules
    },
    ...commonConfigs
  ]);
};

/**
 * Create Uphold TypeScript ESLint config.
 * @param {'commonjs' | 'module'} [moduleType='module'] - The module type, defaulting to ECMAScript modules, most common for TypeScript.
 * @param {object} [options] - Additional options for the configuration.
 * @param {import('eslint').Linter.LanguageOptions['ecmaVersion']} [options.ecmaVersion] - The ECMAScript version to use.
 * @param {LoaderUtils} [utils] - Optional utilities for dependency injection (for testing).
 * @returns {Promise<import('eslint').Linter.Config[]>} Uphold TypeScript ESLint configuration.
 */
export async function createTypeScriptConfig(moduleType = 'module', { ecmaVersion = defaultEcmaVersion } = {}, utils) {
  const checkModule = utils?.isModuleAvailable ?? isModuleAvailable;
  const loadMod = utils?.loadModule ?? loadModule;
  const nodeGlobals = moduleTypeToGlobals[moduleType] || globals.nodeBuiltin;

  if (!checkModule('typescript')) {
    return buildFallbackConfig({ ecmaVersion, moduleType, nodeGlobals });
  }

  if (checkModule('typescript-eslint')) {
    /** @type {import('typescript-eslint').default} */
    const tseslint = await loadMod('typescript-eslint');

    return defineConfig([
      {
        extends: [
          {
            ...js.configs.recommended,
            name: 'eslint/recommended'
          },
          tseslint.configs.recommended
        ],
        files: ['**/*.cts', '**/*.d.ts', '**/*.mts', '**/*.ts', '**/*.tsx'],
        languageOptions: {
          ecmaVersion,
          globals: nodeGlobals,
          parser: tseslint.parser,
          parserOptions: {
            projectService: true
          }
        },
        name: `uphold/typescript-eslint-${moduleType}`,
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

  return buildFallbackConfig({ ecmaVersion, moduleType, nodeGlobals });
}
