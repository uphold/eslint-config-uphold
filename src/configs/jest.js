/**
 * Module dependencies.
 */

import { defineConfig } from 'eslint/config';
import { isModuleAvailable, loadModule } from '../utils/load-module.js';
import globals from 'globals';

/**
 * @typedef {object} LoaderUtils
 * @property {(moduleName: string) => boolean} isModuleAvailable - Check if a module is available.
 * @property {(moduleName: string) => Promise<unknown>} [loadModule] - Dynamically load a module.
 */

/**
 * Create Jest ESLint config.
 * @param {LoaderUtils} [utils] - Optional utilities for dependency injection (for testing).
 * @returns {Promise<import('eslint').Linter.Config[]>} The Jest ESLint config.
 */
export async function createJestConfig(utils) {
  const checkModule = utils?.isModuleAvailable ?? isModuleAvailable;
  const loadMod = utils?.loadModule ?? loadModule;

  const isJestPluginAvailable = checkModule('eslint-plugin-jest');
  const isJestAvailable = checkModule('jest');

  if (isJestPluginAvailable && isJestAvailable) {
    const jestPlugin =
      /** @type {{ configs: Record<string, import('@eslint/config-helpers').Config> }} */
      (await loadMod('eslint-plugin-jest'));

    return defineConfig({
      extends: [{ ...jestPlugin.configs['flat/recommended'], name: 'jest/recommended' }],
      name: 'uphold/jest',
      rules: {
        'jest/padding-around-describe-blocks': 'warn',
        'jest/padding-around-expect-groups': 'warn',
        'jest/prefer-equality-matcher': 'warn',
        'jest/prefer-to-be': 'warn',
        'jest/prefer-to-contain': 'warn',
        'jest/prefer-to-have-been-called': 'warn',
        'jest/prefer-to-have-been-called-times': 'warn',
        'jest/prefer-to-have-length': 'warn',
        'jest/prefer-todo': 'warn'
      }
    });
  }

  if (isJestAvailable) {
    process.emitWarning('`eslint-plugin-jest` is not installed, Jest linting will be disabled', {
      code: 'UPHOLD_ESLINT_JEST_PLUGIN_MISSING',
      type: 'UpholdEslintWarning'
    });

    return defineConfig({
      languageOptions: {
        globals: globals.jest
      },
      name: 'uphold/jest'
    });
  }

  // Jest not installed, exporting an empty config.
  return defineConfig({
    name: 'uphold/jest'
  });
}
