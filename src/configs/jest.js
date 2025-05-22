/**
 * Module dependencies.
 */

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
 * @returns {Promise<import('@eslint/config-helpers').ConfigWithExtends>} The Jest ESLint config.
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

    return {
      extends: [{ ...jestPlugin.configs['flat/recommended'], name: 'jest/recommended' }],
      name: 'uphold/jest-plugin-config',
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
    };
  }

  if (isJestAvailable) {
    console.warn('`eslint-plugin-jest` is not installed, Jest linting will be disabled');

    return {
      languageOptions: {
        globals: globals.jest
      },
      name: 'uphold/jest-globals'
    };
  }

  // Jest not installed, exporting an empty config.
  return {
    name: 'uphold/jest-empty'
  };
}

/**
 * Export the default configuration (evaluated at module load time).
 */

export default await createJestConfig();
