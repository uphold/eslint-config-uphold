/**
 * Module dependencies.
 */

import globals from 'globals';
import mocha from 'eslint-plugin-mocha';

/**
 * Uphold Mocha ESLint config.
 */

export const upholdMochaConfig = {
  languageOptions: {
    globals: {
      ...globals.mocha,
      ...globals.node
    }
  },
  name: 'uphold/mocha',
  plugins: {
    mocha
  },
  rules: {
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-identical-title': 'error',
    'mocha/no-nested-tests': 'error',
    'mocha/no-sibling-hooks': 'error'
  }
};
