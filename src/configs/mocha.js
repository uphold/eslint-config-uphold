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
    extends: [
      // @ts-expect-error Outdated types. See https://github.com/lo1tuma/eslint-plugin-mocha/issues/375
      pluginMocha.configs.recommended
    ],
    name: 'uphold/mocha-plugin-config'
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
  console.error('Mocha is not installed, this config will be empty');

  upholdMochaConfig = {
    name: 'uphold/mocha-empty'
  };
}

/**
 * Export the configuration.
 */

export { upholdMochaConfig as 'module.exports' };
export default upholdMochaConfig;
