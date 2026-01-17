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
  stylisticConfig
} from './configs/common.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import mocha from 'eslint-plugin-mocha';
import nodePlugin from 'eslint-plugin-n';
import promise from 'eslint-plugin-promise';
import rules from './rules/index.js';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import sortImportsRequires from 'eslint-plugin-sort-imports-requires';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import sqlTemplate from 'eslint-plugin-sql-template';
import stylistic from '@stylistic/eslint-plugin';

/**
 * Language options.
 *
 * @type {import('eslint').Linter.Config['languageOptions']}
 */

const languageOptions = {
  ecmaVersion: 2022,
  globals: {
    ...globals.jasmine,
    ...globals.jest,
    ...globals.mocha,
    ...globals.node
  },
  sourceType: 'module'
};

/**
 * Base configuration for Uphold.
 *
 * @type {import('eslint').Linter.Config[]}
 */

const upholdBaseConfig = defineConfig([
  {
    extends: [
      { ...js.configs.recommended, name: 'eslint/recommended' },
      jsdocPluginConfigJavaScript,
      eslintPluginPrettierRecommended
    ],
    languageOptions,
    name: 'uphold/base',
    plugins: {
      '@stylistic': stylistic,
      jsdoc,
      mocha,
      // eslint-disable-next-line id-length
      n: nodePlugin,
      // @ts-expect-error Outdated types for `eslint-plugin-promise`.
      promise,
      // @ts-expect-error Outdated types for `eslint-plugin-sort-destructure-keys`.
      'sort-destructure-keys': sortDestructureKeys,
      'sort-imports-requires': sortImportsRequires,
      'sort-keys-fix': sortKeysFix,
      // @ts-expect-error Outdated types for `eslint-plugin-sql-template`.
      'sql-template': sqlTemplate,
      'uphold-plugin': { rules }
    },
    rules: {
      ...eslintRules,
      ...nodePluginConfig.rules,
      ...promisePluginConfig.rules,
      ...sortDestructureKeysConfig.rules,
      ...sortImportsRequiresConfig.rules,
      ...sortKeysFixConfig.rules,
      ...sqlTemplateConfig.rules,
      ...stylisticConfig.rules,
      // Mocha rules to be removed on next major release.
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-identical-title': 'error',
      'mocha/no-nested-tests': 'error',
      'mocha/no-sibling-hooks': 'error',
      'uphold-plugin/explicit-sinon-use-fake-timers': 'error',
      'uphold-plugin/no-trailing-period-in-log-messages': 'error',
      'uphold-plugin/require-comment-punctuation': 'error'
    }
  }
]);

/**
 * Configuration for bin and scripts files.
 *
 * @type {import('eslint').Linter.Config}
 */

const upholdBinScriptsConfig = {
  files: ['**/bin/**', '**/scripts/**'],
  languageOptions,
  name: 'uphold/scripts',
  rules: {
    'n/no-process-exit': 'off',
    'no-console': 'off'
  }
};

/**
 * `uphold` shared configuration preset.
 *
 * @type {import('eslint').Linter.Config[]}
 */

const uphold = defineConfig([
  {
    extends: [upholdBaseConfig, upholdBinScriptsConfig],
    name: 'uphold/default'
  }
]);

/**
 * Export the configuration.
 *
 * @see https://nodejs.org/docs/latest-v22.x/api/modules.html#loading-ecmascript-modules-using-require
 */

export { uphold as 'module.exports' };
export default uphold;
