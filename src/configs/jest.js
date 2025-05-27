/**
 * Module dependencies.
 */

import { isModuleAvailable, loadModule } from '../utils/load-module.js';

/**
 * Check if `eslint-plugin-jest` and its dependencies are available.
 */

const isJestPluginAvailable = isModuleAvailable('eslint-plugin-jest');
const isJestAvailable = isModuleAvailable('jest');

/**
 * Uphold Jest ESLint config.
 * @type {import('@eslint/config-helpers').ConfigWithExtends}
 */
let upholdJestConfig;

if (isJestPluginAvailable && isJestAvailable) {
  const jestPlugin = await loadModule('eslint-plugin-jest');

  upholdJestConfig = {
    extends: [{ ...jestPlugin.configs['flat/recommended'], name: 'jest/recommended' }],
    name: 'uphold/jest-plugin-config',
    rules: {
      'jest/padding-around-describe-blocks': 'warn',
      'jest/padding-around-expect-groups': 'warn',
      'jest/prefer-called-with': 'warn',
      'jest/prefer-spy-on': 'warn',
      'jest/prefer-to-be': 'warn',
      'jest/prefer-to-contain': 'warn',
      'jest/prefer-to-have-length': 'warn',
      'jest/prefer-todo': 'warn'
    }
  };
} else if (isJestAvailable) {
  if (!isJestPluginAvailable) {
    console.warn('eslint-plugin-jest is not installed, Jest linting will be disabled');
  }

  const globals = await loadModule('globals');

  upholdJestConfig = {
    languageOptions: {
      globals: globals.jest
    },
    name: 'uphold/jest-globals'
  };
} else {
  console.error('Jest is not installed, this config will be empty');

  upholdJestConfig = {
    name: 'uphold/jest-empty'
  };
}

/**
 * Export the configuration.
 */

export { upholdJestConfig as 'module.exports' };
export default upholdJestConfig;
