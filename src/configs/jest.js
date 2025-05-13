/**
 * Module dependencies.
 */

import pluginJest from 'eslint-plugin-jest';

/**
 * Export Jest ESLint config.
 */

export const upholdJestConfig = {
  languageOptions: {
    globals: pluginJest.environments.globals
  },
  name: 'uphold/jest',
  plugins: {
    jest: pluginJest
  },
  rules: {
    ...pluginJest.configs['flat/recommended'].rules,
    'jest/prefer-called-with': 'error',
    'jest/prefer-spy-on': 'warn',
    'jest/prefer-to-be': 'error',
    'jest/prefer-to-contain': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/prefer-todo': 'warn'
  }
};
