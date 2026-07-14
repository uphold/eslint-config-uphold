/**
 * Module dependencies.
 */

import { createJestConfig } from '../../../src/configs/jest.js';
import { describe, it } from 'node:test';

/**
 * Test suite for Jest config.
 */

describe('Jest config', () => {
  describe('createJestConfig()', () => {
    it('should return a config array when Jest is not installed', async (/** @type {import('node:test').TestContext} */ t) => {
      const configs = await createJestConfig({
        isModuleAvailable: () => false,
        loadModule: () => Promise.resolve({})
      });

      t.assert.snapshot(configs);
    });

    it('should return globals config when Jest is installed but plugin is not', async (/** @type {import('node:test').TestContext} */ t) => {
      const warnMock = t.mock.method(process, 'emitWarning');
      const configs = await createJestConfig({
        isModuleAvailable: moduleName => moduleName === 'jest'
      });

      t.assert.snapshot(configs);
      t.assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have emitted a warning');
      t.assert.strictEqual(
        warnMock.mock.calls[0].arguments[0],
        '`eslint-plugin-jest` is not installed, Jest linting will be disabled'
      );
      t.assert.deepStrictEqual(warnMock.mock.calls[0].arguments[1], {
        code: 'UPHOLD_ESLINT_JEST_PLUGIN_MISSING',
        type: 'UpholdEslintWarning'
      });
    });

    it('should return full plugin config when both Jest and plugin are installed', async (/** @type {import('node:test').TestContext} */ t) => {
      const mockRecommendedConfig = { name: 'jest/recommended', rules: { 'jest/no-disabled-tests': 'warn' } };

      const configs = await createJestConfig({
        isModuleAvailable: moduleName => moduleName === 'jest' || moduleName === 'eslint-plugin-jest',
        loadModule: moduleName => {
          if (moduleName === 'eslint-plugin-jest') {
            return Promise.resolve({ configs: { 'flat/recommended': mockRecommendedConfig } });
          }

          return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
        }
      });

      t.assert.snapshot(configs);
    });
  });
});
