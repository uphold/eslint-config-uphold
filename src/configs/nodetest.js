/**
 * Module dependencies.
 */

import { defineConfig } from 'eslint/config';
import { isModuleAvailable, loadModule } from '../utils/load-module.js';

/**
 * Create Node Test ESLint config.
 * @param {object} [utils] - Optional utilities for dependency injection (for testing).
 * @param {(moduleName: string) => boolean} utils.isModuleAvailable - Check if a module is available.
 * @param {typeof loadModule} [utils.loadModule] - Dynamically load a module.
 * @returns {Promise<import('eslint').Linter.Config[]>} The Node Test ESLint config.
 */
export async function createNodeTestConfig(utils) {
  const checkModule = utils?.isModuleAvailable ?? isModuleAvailable;
  const loadMod = utils?.loadModule ?? loadModule;

  const pluginName = 'eslint-node-test';

  const isPluginAvailable = checkModule(pluginName);

  if (isPluginAvailable) {
    const nodeTestPlugin = await loadMod(pluginName);

    return defineConfig({
      extends: [nodeTestPlugin.configs.recommended],
      name: 'uphold/nodeTest',
      rules: {
        'id-length': ['error', { exceptions: ['t'] }],
        'no-inline-comments': 'off',
        'node-test/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
        'node-test/no-commented-tests': 'error',
        'node-test/no-skip-without-reason': 'warn',
        'node-test/no-sleep-in-test': 'error',
        'node-test/no-snapshot-in-loop': 'error',
        'node-test/no-todo-test': 'warn',
        'node-test/no-unneeded-async-rejects-callback': 'error',
        'node-test/prefer-diagnostic': 'warn',
        'node-test/require-top-level-describe': 'error'
      }
    });
  }

  process.emitWarning('`eslint-node-test` is not installed, Node test linting will be disabled', {
    code: 'UPHOLD_ESLINT_NODE_TEST_PLUGIN_MISSING',
    type: 'UpholdEslintWarning'
  });

  return defineConfig({
    name: 'uphold/empty-nodeTest'
  });
}
