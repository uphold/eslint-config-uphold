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
  describe('default export', () => {
    it('should export a valid ESLint config object', async () => {
      const mochaConfig = await import('../../../src/configs/mocha.js');

      assert.ok(mochaConfig.default, 'Should have default export');
      assert.ok(mochaConfig.default.name, 'Config should have a name');
      assert.ok(typeof mochaConfig.default === 'object', 'Config should be an object');
    });

    it('should have correct name prefix', async () => {
      const mochaConfig = await import('../../../src/configs/mocha.js');

      assert.ok(mochaConfig.default.name, 'Config should have a name');
      assert.ok(
        mochaConfig.default.name.startsWith('uphold/mocha'),
        `Config name should start with 'uphold/mocha', got: ${mochaConfig.default.name}`
      );
    });
  });

  describe('createMochaConfig()', () => {
    it('should export an empty config when Mocha is not installed', async () => {
      const config = await createMochaConfig({
        isModuleAvailable: () => false
      });

      assert.strictEqual(config.name, 'uphold/mocha-empty', 'Should have empty config name');
      assert.ok(!config.extends, 'Empty config should not have extends');
      assert.ok(!config.rules, 'Empty config should not have rules');
      assert.ok(!config.languageOptions, 'Empty config should not have `languageOptions`');
    });

    it('should export globals config when Mocha is installed but plugin is not', async context => {
      const warnMock = context.mock.method(console, 'warn');
      const config = await createMochaConfig({
        isModuleAvailable: moduleName => moduleName === 'mocha'
      });

      assert.strictEqual(
        config.name,
        'uphold/mocha-globals',
        'Should have globals config name when plugin not installed'
      );
      assert.ok(config.languageOptions, 'Should have `languageOptions`');
      assert.ok(config.languageOptions.globals, 'Should have Mocha globals defined');
      assert.ok(!config.extends, 'Globals config should not have extends');
      assert.ok(!config.rules, 'Globals config should not have rules');

      // Verify warning was logged.
      assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have logged a warning');
      assert.strictEqual(
        warnMock.mock.calls[0].arguments[0],
        '`eslint-plugin-mocha` is not installed, Mocha linting will be disabled'
      );
    });

    it('should export full plugin config when both Mocha and plugin are installed', async () => {
      const mockRecommendedConfig = { rules: { 'mocha/no-exclusive-tests': 'error' } };

      const config = await createMochaConfig({
        isModuleAvailable: moduleName => moduleName === 'mocha' || moduleName === 'eslint-plugin-mocha',
        loadModule: moduleName => {
          if (moduleName === 'eslint-plugin-mocha') {
            return Promise.resolve({ configs: { recommended: mockRecommendedConfig } });
          }

          return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
        }
      });

      assert.strictEqual(config.name, 'uphold/mocha-plugin-config', 'Should have plugin config name');
      assert.ok(config.extends, 'Should have extends');
      assert.ok(Array.isArray(config.extends), 'extends should be an array');
      assert.strictEqual(config.extends.length, 1, 'extends should have one config');
      assert.ok(config.rules, 'Should have rules');
      assert.strictEqual(Object.keys(config.rules).length, 4);
      assert.strictEqual(config.rules['mocha/no-exclusive-tests'], 'error');
      assert.strictEqual(config.rules['mocha/no-identical-title'], 'error');
      assert.strictEqual(config.rules['mocha/no-nested-tests'], 'error');
      assert.strictEqual(config.rules['mocha/no-sibling-hooks'], 'error');
      assert.ok(!config.languageOptions, 'Plugin config should not have `languageOptions`');
    });
  });
});
