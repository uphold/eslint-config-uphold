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
 * Create Vitest ESLint config.
 * @param {LoaderUtils} [utils] - Optional utilities for dependency injection (for testing).
 * @returns {Promise<import('@eslint/config-helpers').ConfigWithExtends>} The Vitest ESLint config.
 */
export async function createVitestConfig(utils) {
  const checkModule = utils?.isModuleAvailable ?? isModuleAvailable;
  const loadMod = utils?.loadModule ?? loadModule;

  const isVitestPluginAvailable = checkModule('@vitest/eslint-plugin');
  const isVitestAvailable = checkModule('vitest');

  if (isVitestPluginAvailable && isVitestAvailable) {
    const vitestPlugin = await loadMod('@vitest/eslint-plugin');

    return {
      extends: [vitestPlugin.configs.recommended],
      languageOptions: vitestPlugin.configs.env.languageOptions,
      name: 'uphold/vitest-plugin-config',
      rules: {
        'vitest/no-commented-out-tests': 'warn',
        'vitest/no-disabled-tests': 'warn',
        'vitest/no-focused-tests': 'error',
        'vitest/no-interpolation-in-snapshots': 'error',
        'vitest/no-mocks-import': 'error',
        'vitest/no-standalone-expect': 'error',
        'vitest/no-test-prefixes': 'error',
        'vitest/prefer-expect-resolves': 'warn',
        'vitest/prefer-to-have-length': 'warn'
      }
    };
  }

  if (isVitestAvailable) {
    console.warn('`@vitest/eslint-plugin` is not installed, Vitest linting will be disabled');

    return {
      languageOptions: {
        globals: globals.vitest
      },
      name: 'uphold/vitest-globals'
    };
  }

  // Vitest not installed, exporting an empty config.
  return {
    name: 'uphold/vitest-empty'
  };
}

/**
 * Export the default configuration (evaluated at module load time).
 */

export default await createVitestConfig();
