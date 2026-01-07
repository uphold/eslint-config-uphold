/**
 * Module dependencies.
 */

import { isModuleAvailable, loadModule } from '../utils/load-module.js';

/**
 * Check if `vitest` is available.
 */

const isVitestAvailable = isModuleAvailable('vitest');

/**
 * Uphold Vitest ESLint config.
 * @type {import('@eslint/config-helpers').ConfigWithExtends}
 * @todo Add `@vitest/eslint-plugin` and/or `eslint-plugin-vitest-globals`.
 */
let upholdVitestConfig;

if (isVitestAvailable) {
  const globals = await loadModule('globals');

  upholdVitestConfig = {
    languageOptions: {
      globals: globals.vitest
    },
    name: 'uphold/vitest-globals'
  };
} else {
  //  Vitest not installed, exporting an empty config.
  upholdVitestConfig = {
    name: 'uphold/vitest-empty'
  };
}

/**
 * Export the configuration.
 */

export default upholdVitestConfig;
