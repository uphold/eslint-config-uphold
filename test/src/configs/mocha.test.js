/**
 * Module dependencies.
 */

import { createMochaConfig } from '../../../src/configs/mocha.js';
import { describe, it } from 'node:test';

/**
 * Test suite for Mocha config.
 */

describe('Mocha config', () => {
  describe('createMochaConfig()', () => {
    it('should return a config array when Mocha is not installed', async (/** @type {import('node:test').TestContext} */ t) => {
      const configs = await createMochaConfig({
        isModuleAvailable: () => false
      });

      t.assert.snapshot(configs);
    });

    it('should return globals config when Mocha is installed but plugin is not', async (/** @type {import('node:test').TestContext} */ t) => {
      const warnMock = t.mock.method(process, 'emitWarning');
      const configs = await createMochaConfig({
        isModuleAvailable: moduleName => moduleName === 'mocha'
      });

      t.assert.snapshot(configs);

      // Verify warning was emitted.
      t.assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have emitted a warning');
      t.assert.strictEqual(
        warnMock.mock.calls[0].arguments[0],
        '`eslint-plugin-mocha` is not installed, Mocha linting will be disabled'
      );
      t.assert.deepStrictEqual(warnMock.mock.calls[0].arguments[1], {
        code: 'UPHOLD_ESLINT_MOCHA_PLUGIN_MISSING',
        type: 'UpholdEslintWarning'
      });
    });

    it('should return full plugin config when both Mocha and plugin are installed', async (/** @type {import('node:test').TestContext} */ t) => {
      const mockRecommendedConfig = { name: 'mocha/recommended', rules: { 'mocha/no-exclusive-tests': 'error' } };

      const configs = await createMochaConfig({
        isModuleAvailable: moduleName => moduleName === 'mocha' || moduleName === 'eslint-plugin-mocha',
        loadModule: moduleName => {
          if (moduleName === 'eslint-plugin-mocha') {
            return Promise.resolve({ configs: { recommended: mockRecommendedConfig } });
          }

          return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
        }
      });

      t.assert.snapshot(configs);
    });
  });
});
