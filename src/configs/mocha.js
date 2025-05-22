/**
 * Module dependencies.
 */

import { isModuleAvailable, loadModule } from '../utils/load-module.js';

/**
 * Check if `eslint-plugin-mocha` and its dependencies are available.
 */

const isMochaPluginAvailable = isModuleAvailable('eslint-plugin-mocha');
const isMochaAvailable = isModuleAvailable('mocha');

/**
 * Uphold Mocha ESLint config.
 * @type {import('@eslint/config-helpers').ConfigWithExtends}
 */
let upholdMochaConfig;

if (isMochaPluginAvailable && isMochaAvailable) {
  const pluginMocha = await loadModule('eslint-plugin-mocha');

  upholdMochaConfig = {
    extends: [pluginMocha.configs.recommended],
    name: 'uphold/mocha-plugin-config',
    rules: {
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-identical-title': 'error',
      'mocha/no-nested-tests': 'error',
      'mocha/no-sibling-hooks': 'error'
    }
  };
} else if (isMochaAvailable) {
  console.warn('`eslint-plugin-mocha` is not installed, Mocha linting will be disabled');

  const globals = await loadModule('globals');

  upholdMochaConfig = {
    languageOptions: {
      globals: globals.mocha
    },
    name: 'uphold/mocha-globals'
  };
} else {
  //  Mocha not installed, exporting an empty config.
  upholdMochaConfig = {
    name: 'uphold/mocha-empty'
  };
}

/**
 * Export the configuration.
 */

export default upholdMochaConfig;
