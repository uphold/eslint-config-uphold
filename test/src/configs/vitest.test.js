/**
 * Module dependencies.
 */

import { createVitestConfig } from '../../../src/configs/vitest.js';
import { describe, it } from 'node:test';

/**
 * Test suite for Vitest config.
 */

describe('Vitest config', () => {
  describe('createVitestConfig()', () => {
    it('should return a config array when Vitest is not installed', async (/** @type {import('node:test').TestContext} */ t) => {
      const configs = await createVitestConfig({
        isModuleAvailable: () => false
      });

      t.assert.snapshot(configs);
    });

    it('should return globals config when Vitest is installed but plugin is not', async (/** @type {import('node:test').TestContext} */ t) => {
      const warnMock = t.mock.method(process, 'emitWarning');

      const configs = await createVitestConfig({
        isModuleAvailable: moduleName => moduleName === 'vitest'
      });

      t.assert.snapshot(configs);

      // Verify warning was emitted.
      t.assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have emitted a warning');
      t.assert.strictEqual(
        warnMock.mock.calls[0].arguments[0],
        '`@vitest/eslint-plugin` is not installed, Vitest linting will be disabled'
      );
      t.assert.deepStrictEqual(warnMock.mock.calls[0].arguments[1], {
        code: 'UPHOLD_ESLINT_VITEST_PLUGIN_MISSING',
        type: 'UpholdEslintWarning'
      });
    });

    it('should return full plugin config when Vitest and plugin are installed', async (/** @type {import('node:test').TestContext} */ t) => {
      const mockRecommendedConfig = { name: 'vitest/recommended', rules: { 'vitest/expect-expect': 'error' } };
      const mockLanguageOptions = { globals: { vi: true } };

      const configs = await createVitestConfig({
        isModuleAvailable: moduleName => moduleName === 'vitest' || moduleName === '@vitest/eslint-plugin',
        loadModule: moduleName => {
          if (moduleName === '@vitest/eslint-plugin') {
            return Promise.resolve({
              configs: {
                env: { languageOptions: mockLanguageOptions },
                recommended: mockRecommendedConfig
              }
            });
          }

          return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
        }
      });

      t.assert.snapshot(configs);
    });
  });
});
