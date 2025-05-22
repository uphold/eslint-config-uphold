/**
 * Module dependencies.
 */

import { isModuleAvailable } from '../utils/load-module.js';
import globals from 'globals';

/**
 * @typedef {object} LoaderUtils
 * @property {(moduleName: string) => boolean} isModuleAvailable - Check if a module is available.
 */

/**
 * Create Vitest ESLint config.
 * @param {LoaderUtils} [utils] - Optional utilities for dependency injection (for testing).
 * @returns {import('@eslint/config-helpers').ConfigWithExtends} The Vitest ESLint config.
 * @todo Add `@vitest/eslint-plugin` and/or `eslint-plugin-vitest-globals`.
 */
export function createVitestConfig(utils) {
  const checkModule = utils?.isModuleAvailable ?? isModuleAvailable;

  const isVitestAvailable = checkModule('vitest');

  if (isVitestAvailable) {
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

export default createVitestConfig();
