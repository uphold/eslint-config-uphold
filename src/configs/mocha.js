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
 * Create Mocha ESLint config.
 * @param {LoaderUtils} [utils] - Optional utilities for dependency injection (for testing).
 * @returns {Promise<import('@eslint/config-helpers').ConfigWithExtends>} The Mocha ESLint config.
 */
export async function createMochaConfig(utils) {
  const checkModule = utils?.isModuleAvailable ?? isModuleAvailable;
  const loadMod = utils?.loadModule ?? loadModule;

  const isMochaPluginAvailable = checkModule('eslint-plugin-mocha');
  const isMochaAvailable = checkModule('mocha');

  if (isMochaPluginAvailable && isMochaAvailable) {
    const pluginMocha =
      /** @type {{ configs: { recommended: import('@eslint/config-helpers').Config } }} */
      (await loadMod('eslint-plugin-mocha'));

    return {
      extends: [pluginMocha.configs.recommended],
      name: 'uphold/mocha-plugin-config',
      rules: {
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-identical-title': 'error',
        'mocha/no-nested-tests': 'error',
        'mocha/no-sibling-hooks': 'error'
      }
    };
  }

  if (isMochaAvailable) {
    console.warn('`eslint-plugin-mocha` is not installed, Mocha linting will be disabled');

    return {
      languageOptions: {
        globals: globals.mocha
      },
      name: 'uphold/mocha-globals'
    };
  }

  // Mocha not installed, exporting an empty config.
  return {
    name: 'uphold/mocha-empty'
  };
}

/**
 * Export the default configuration (evaluated at module load time).
 */

export default await createMochaConfig();
