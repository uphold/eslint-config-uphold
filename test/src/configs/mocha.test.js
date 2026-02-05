/**
 * Module dependencies.
 */

import { createMochaConfig } from '../../../src/configs/mocha.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Test suite for Mocha config.
 */

describe('Mocha config', () => {
  describe('createMochaConfig()', () => {
    it('should return a config array when Mocha is not installed', async () => {
      const configs = await createMochaConfig({
        isModuleAvailable: () => false
      });

      assert.ok(Array.isArray(configs), 'Should return an array');
      assert.strictEqual(configs.length, 1, 'Should have one config');
      assert.strictEqual(configs[0].name, 'uphold/mocha', 'Should have correct config name');
      assert.ok(!configs[0].rules, 'Empty config should not have rules');
      assert.ok(!configs[0].languageOptions, 'Empty config should not have `languageOptions`');
    });

    it('should return globals config when Mocha is installed but plugin is not', async context => {
      const warnMock = context.mock.method(console, 'warn');
      const configs = await createMochaConfig({
        isModuleAvailable: moduleName => moduleName === 'mocha'
      });

      assert.ok(Array.isArray(configs), 'Should return an array');
      assert.strictEqual(configs.length, 1, 'Should have one config');
      assert.strictEqual(configs[0].name, 'uphold/mocha', 'Should have correct config name');
      assert.ok(configs[0].languageOptions, 'Should have `languageOptions`');
      assert.ok(configs[0].languageOptions.globals, 'Should have Mocha globals defined');
      assert.ok(!configs[0].rules, 'Globals config should not have rules');

      // Verify warning was logged.
      assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have logged a warning');
      assert.strictEqual(
        warnMock.mock.calls[0].arguments[0],
        '`eslint-plugin-mocha` is not installed, Mocha linting will be disabled'
      );
    });

    it('should return full plugin config when both Mocha and plugin are installed', async () => {
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

      assert.ok(Array.isArray(configs), 'Should return an array');
      // defineConfig flattens extends, so we have 2 configs: mocha/recommended + uphold/mocha.
      assert.strictEqual(configs.length, 2, 'Should have two configs (extended + main)');

      // First config is the extended mocha/recommended (prefixed by defineConfig).
      assert.strictEqual(
        configs[0].name,
        'uphold/mocha > mocha/recommended',
        'First config should be prefixed mocha/recommended'
      );

      // Second config is our uphold/mocha config with rules.
      assert.strictEqual(configs[1].name, 'uphold/mocha', 'Second config should be uphold/mocha');
      assert.ok(configs[1].rules, 'Should have rules');
      assert.strictEqual(Object.keys(configs[1].rules).length, 4);
      assert.strictEqual(configs[1].rules['mocha/no-exclusive-tests'], 'error');
      assert.strictEqual(configs[1].rules['mocha/no-identical-title'], 'error');
      assert.strictEqual(configs[1].rules['mocha/no-nested-tests'], 'error');
      assert.strictEqual(configs[1].rules['mocha/no-sibling-hooks'], 'error');
      assert.ok(!configs[1].languageOptions, 'Plugin config should not have `languageOptions`');
    });
  });
});
