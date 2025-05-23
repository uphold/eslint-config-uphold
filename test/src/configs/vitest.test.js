/**
 * Module dependencies.
 */

import { createVitestConfig } from '../../../src/configs/vitest.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Test suite for Vitest config.
 */

describe('Vitest config', () => {
  describe('default export', () => {
    it('should export a valid ESLint config object', async () => {
      const vitestConfig = await import('../../../src/configs/vitest.js');

      assert.ok(vitestConfig.default, 'Should have default export');
      assert.ok(vitestConfig.default.name, 'Config should have a name');
      assert.ok(typeof vitestConfig.default === 'object', 'Config should be an object');
    });

    it('should have correct name prefix', async () => {
      const vitestConfig = await import('../../../src/configs/vitest.js');

      assert.ok(vitestConfig.default.name, 'Config should have a name');
      assert.ok(
        vitestConfig.default.name.startsWith('uphold/vitest'),
        `Config name should start with 'uphold/vitest', got: ${vitestConfig.default.name}`
      );
    });
  });

  describe('createVitestConfig()', () => {
    it('should export an empty config when Vitest is not installed', async () => {
      const config = await createVitestConfig({
        isModuleAvailable: () => false
      });

      assert.strictEqual(config.name, 'uphold/vitest-empty', 'Should have empty config name');
      assert.ok(!config.languageOptions, 'Empty config should not have `languageOptions`');
      assert.ok(!config.extends, 'Empty config should not have `extends`');
      assert.ok(!config.rules, 'Empty config should not have `rules`');
    });

    it('should export globals config when Vitest is installed but plugin is not', async context => {
      const warnMock = context.mock.method(console, 'warn');

      const config = await createVitestConfig({
        isModuleAvailable: moduleName => moduleName === 'vitest'
      });

      assert.strictEqual(
        config.name,
        'uphold/vitest-globals',
        'Should have globals config name when plugin not installed'
      );
      assert.ok(config.languageOptions, 'Should have `languageOptions`');
      assert.ok(config.languageOptions.globals, 'Should have Vitest globals defined');

      // Verify warning was logged.
      assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have logged a warning');
      assert.strictEqual(
        warnMock.mock.calls[0].arguments[0],
        '`@vitest/eslint-plugin` is not installed, Vitest linting will be disabled'
      );
    });

    it('should export full plugin config when Vitest and plugin are installed', async () => {
      const mockRecommendedConfig = { rules: { 'vitest/expect-expect': 'error' } };
      const mockLanguageOptions = { globals: { vi: true } };

      const config = await createVitestConfig({
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

      assert.strictEqual(config.name, 'uphold/vitest-plugin-config', 'Should have plugin config name');
      assert.ok(config.extends, 'Should have `extends`');
      assert.ok(Array.isArray(config.extends), '`extends` should be an array');
      assert.strictEqual(config.extends.length, 1, '`extends` should have one config');
      assert.ok(config.languageOptions, 'Should have `languageOptions`');
      assert.ok(config.rules, 'Should have `rules`');
      assert.strictEqual(Object.keys(config.rules).length, 9);
      assert.strictEqual(config.rules['vitest/no-commented-out-tests'], 'warn');
      assert.strictEqual(config.rules['vitest/no-disabled-tests'], 'warn');
      assert.strictEqual(config.rules['vitest/no-focused-tests'], 'error');
      assert.strictEqual(config.rules['vitest/no-interpolation-in-snapshots'], 'error');
      assert.strictEqual(config.rules['vitest/no-mocks-import'], 'error');
      assert.strictEqual(config.rules['vitest/no-standalone-expect'], 'error');
      assert.strictEqual(config.rules['vitest/no-test-prefixes'], 'error');
      assert.strictEqual(config.rules['vitest/prefer-expect-resolves'], 'warn');
      assert.strictEqual(config.rules['vitest/prefer-to-have-length'], 'warn');
    });
  });
});
