/**
 * Module dependencies.
 */

import globals from 'globals';

/**
 * Uphold Vitest ESLint config.
 * @type {import('@eslint/config-helpers').ConfigWithExtends}
 * @todo Add `@vitest/eslint-plugin` and/or `eslint-plugin-vitest-globals`.
 */

const upholdVitestConfig = {
  languageOptions: {
    globals: globals.vitest
  },
  name: 'uphold/vitest-globals'
};

/**
 * Export the configuration.
 */

export { upholdVitestConfig as 'module.exports' };
export default upholdVitestConfig;
