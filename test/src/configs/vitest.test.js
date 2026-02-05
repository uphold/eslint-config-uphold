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
  describe('createVitestConfig()', () => {
    it('should return a config array when Vitest is not installed', async () => {
      const configs = await createVitestConfig({
        isModuleAvailable: () => false
      });

      assert.ok(Array.isArray(configs), 'Should return an array');
      assert.strictEqual(configs.length, 1, 'Should have one config');
      assert.strictEqual(configs[0].name, 'uphold/vitest', 'Should have correct config name');
      assert.ok(!configs[0].languageOptions, 'Empty config should not have `languageOptions`');
      assert.ok(!configs[0].rules, 'Empty config should not have `rules`');
    });

    it('should return globals config when Vitest is installed but plugin is not', async context => {
      const warnMock = context.mock.method(console, 'warn');

      const configs = await createVitestConfig({
        isModuleAvailable: moduleName => moduleName === 'vitest'
      });

      assert.ok(Array.isArray(configs), 'Should return an array');
      assert.strictEqual(configs.length, 1, 'Should have one config');
      assert.strictEqual(configs[0].name, 'uphold/vitest', 'Should have correct config name');
      assert.ok(configs[0].languageOptions, 'Should have `languageOptions`');
      assert.ok(configs[0].languageOptions.globals, 'Should have Vitest globals defined');

      // Verify warning was logged.
      assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have logged a warning');
      assert.strictEqual(
        warnMock.mock.calls[0].arguments[0],
        '`@vitest/eslint-plugin` is not installed, Vitest linting will be disabled'
      );
    });

    it('should return full plugin config when Vitest and plugin are installed', async () => {
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

      assert.ok(Array.isArray(configs), 'Should return an array');
      // defineConfig flattens extends, so we have 2 configs: vitest/recommended + uphold/vitest.
      assert.strictEqual(configs.length, 2, 'Should have two configs (extended + main)');

      // First config is the extended vitest/recommended (prefixed by defineConfig).
      assert.strictEqual(
        configs[0].name,
        'uphold/vitest > vitest/recommended',
        'First config should be prefixed vitest/recommended'
      );

      // Second config is our uphold/vitest config with rules.
      assert.strictEqual(configs[1].name, 'uphold/vitest', 'Second config should be uphold/vitest');
      assert.ok(configs[1].languageOptions, 'Should have `languageOptions`');
      assert.ok(configs[1].rules, 'Should have `rules`');
      assert.strictEqual(Object.keys(configs[1].rules).length, 9);
      assert.strictEqual(configs[1].rules['vitest/no-commented-out-tests'], 'warn');
      assert.strictEqual(configs[1].rules['vitest/no-disabled-tests'], 'warn');
      assert.strictEqual(configs[1].rules['vitest/no-focused-tests'], 'error');
      assert.strictEqual(configs[1].rules['vitest/no-interpolation-in-snapshots'], 'error');
      assert.strictEqual(configs[1].rules['vitest/no-mocks-import'], 'error');
      assert.strictEqual(configs[1].rules['vitest/no-standalone-expect'], 'error');
      assert.strictEqual(configs[1].rules['vitest/no-test-prefixes'], 'error');
      assert.strictEqual(configs[1].rules['vitest/prefer-expect-resolves'], 'warn');
      assert.strictEqual(configs[1].rules['vitest/prefer-to-have-length'], 'warn');
    });
  });
});
