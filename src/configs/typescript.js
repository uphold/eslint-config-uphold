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
  upholdPluginConfig
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
 * Common configs for both `typescript-eslint` and `eslint`.
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
  eslintPluginPrettierRecommended
];

/**
 * Uphold TypeScript ESLint config.
 */

let upholdTypescriptConfig;

if (isTypescriptEslintAvailable) {
  const tseslint = await import('typescript-eslint');

  upholdTypescriptConfig = tseslint.config([
    {
      extends: [
        { ...eslint.configs.recommended, name: 'eslint/recommended' },
        tseslint.configs.eslintRecommended,
        tseslint.configs.recommended
      ],
      languageOptions: {
        ecmaVersion: 2022,
        globals: globals.nodeBuiltin,
        parser: tseslint.parser,
        parserOptions: {
          sourceType: 'module',
          tsconfigRootDir: './'
        }
      },
      name: 'uphold/typescript-eslint',
      plugins: {
        '@typescript-eslint': tseslint.plugin
      },
      rules: {
        ...eslintRules,
        '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_', varsIgnorePattern: '^_.+' }]
      }
    },
    ...commonConfigs
  ]);
} else {
  // eslint-disable-next-line no-console
  console.warn('`typescript-eslint` not installed. Falling back to Babel parser for TypeScript support.');

  const { defineConfig } = await import('eslint/config');
  const babelParser = await import('@babel/eslint-parser');

  upholdTypescriptConfig = defineConfig(
    {
      languageOptions: {
        ecmaVersion: 2022,
        globals: globals.nodeBuiltin,
        parser: babelParser,
        parserOptions: {
          requireConfigFile: false
        },
        sourceType: 'module'
      },
      name: 'uphold/typescript-babel'
    },
    ...commonConfigs
  );
}

/**
 * Export the configuration.
 */

export { upholdTypescriptConfig as 'module.exports' };
export default upholdTypescriptConfig;
