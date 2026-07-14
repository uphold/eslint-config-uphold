/**
 * Module dependencies.
 */

import { createNodeTestConfig } from '../../../src/configs/nodetest.js';
import { describe, it } from 'node:test';

/**
 * Test suite for Node test config.
 */

describe('Node test config', () => {
  describe('createNodeTestConfig()', () => {
    it('should return an empty config when eslint-node-test plugin is not installed', async (/** @type {import('node:test').TestContext} */
    t) => {
      const warnMock = t.mock.method(process, 'emitWarning');

      const configs = await createNodeTestConfig({
        isModuleAvailable: () => false
      });

      t.assert.snapshot(configs);

      // Verify warning was emitted.
      t.assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have emitted a warning');
      t.assert.strictEqual(
        warnMock.mock.calls[0].arguments[0],
        '`eslint-node-test` is not installed, Node test linting will be disabled'
      );
      t.assert.deepStrictEqual(warnMock.mock.calls[0].arguments[1], {
        code: 'UPHOLD_ESLINT_NODE_TEST_PLUGIN_MISSING',
        type: 'UpholdEslintWarning'
      });
    });

    it('should return full plugin config when eslint-node-test plugin is installed', async (/** @type {import('node:test').TestContext} */ t) => {
      const mockRecommendedConfig = { name: 'node-test/recommended', rules: { 'node-test/no-disabled-tests': 'warn' } };

      const configs = await createNodeTestConfig({
        isModuleAvailable: moduleName => moduleName === 'eslint-node-test',
        loadModule: moduleName => {
          if (moduleName === 'eslint-node-test') {
            return Promise.resolve({ configs: { recommended: mockRecommendedConfig } });
          }

          return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
        }
      });

      t.assert.snapshot(configs);

      // First config is the extended node-test/recommended (prefixed by defineConfig).
      t.assert.strictEqual(
        configs[0].name,
        'uphold/nodeTest > node-test/recommended',
        'First config should be prefixed node-test/recommended'
      );
    });
  });
});
