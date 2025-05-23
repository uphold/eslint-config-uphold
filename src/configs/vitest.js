/**
 * Module dependencies.
 */

import { isModuleAvailable, loadModule } from '../utils/load-module.js';

/**
 * Check if `@vitest/eslint-plugin` and its dependencies are available.
 */

const isTypeScriptAvailable = isModuleAvailable('typescript');
const isVitestPluginAvailable = isModuleAvailable('@vitest/eslint-plugin');
const isVitestAvailable = isModuleAvailable('vitest');

/**
 * Uphold Vitest ESLint config.
 * @type {import('@eslint/config-helpers').ConfigWithExtends}
 */
let upholdVitestConfig;

if (isVitestPluginAvailable && isTypeScriptAvailable && isVitestAvailable) {
  const { default: vitestPlugin } = await loadModule('@vitest/eslint-plugin');

  upholdVitestConfig = {
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
} else if (isVitestAvailable) {
  if (!isTypeScriptAvailable) {
    console.warn('`typescript` is not installed, Vitest linting will be disabled');
  }

  if (!isVitestPluginAvailable) {
    console.warn('`@vitest/eslint-plugin` is not installed, Vitest linting will be disabled');
  }

  const globals = await loadModule('globals');

  upholdVitestConfig = {
    languageOptions: {
      globals: globals.vitest
    },
    name: 'uphold/vitest-globals'
  };
} else {
  console.error('Vitest is not installed, this config will be empty');

  upholdVitestConfig = {
    name: 'uphold/vitest-empty'
  };
}

/**
 * Export the configuration.
 */

export { upholdVitestConfig as 'module.exports' };
export default upholdVitestConfig;
