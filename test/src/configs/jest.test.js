/**
 * Module dependencies.
 */

import { createJestConfig } from '../../../src/configs/jest.js';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Test suite for Jest config.
 */

describe('Jest config', () => {
  describe('default export', () => {
    it('should export a valid ESLint config object', async () => {
      const jestConfig = await import('../../../src/configs/jest.js');

      assert.ok(jestConfig.default, 'Should have default export');
      assert.ok(jestConfig.default.name, 'Config should have a name');
      assert.ok(typeof jestConfig.default === 'object', 'Config should be an object');
    });

    it('should have correct name prefix', async () => {
      const jestConfig = await import('../../../src/configs/jest.js');

      assert.ok(jestConfig.default.name, 'Config should have a name');
      assert.ok(
        jestConfig.default.name.startsWith('uphold/jest'),
        `Config name should start with 'uphold/jest', got: ${jestConfig.default.name}`
      );
    });
  });

  describe('createJestConfig()', () => {
    it('should export an empty config when Jest is not installed', async () => {
      const config = await createJestConfig({
        isModuleAvailable: () => false,
        loadModule: () => Promise.resolve({})
      });

      assert.strictEqual(config.name, 'uphold/jest-empty', 'Should have empty config name');
      assert.ok(!config.extends, 'Empty config should not have extends');
      assert.ok(!config.rules, 'Empty config should not have rules');
      assert.ok(!config.languageOptions, 'Empty config should not have `languageOptions`');
    });

    it('should export globals config when Jest is installed but plugin is not', async context => {
      const warnMock = context.mock.method(console, 'warn');
      const config = await createJestConfig({
        isModuleAvailable: moduleName => moduleName === 'jest'
      });

      assert.strictEqual(
        config.name,
        'uphold/jest-globals',
        'Should have globals config name when plugin not installed'
      );
      assert.ok(config.languageOptions, 'Should have `languageOptions`');
      assert.ok(config.languageOptions.globals, 'Should have Jest globals defined');
      assert.ok(!config.extends, 'Globals config should not have extends');
      assert.ok(!config.rules, 'Globals config should not have rules');

      // Verify warning was logged.
      assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have logged a warning');
      assert.strictEqual(
        warnMock.mock.calls[0].arguments[0],
        '`eslint-plugin-jest` is not installed, Jest linting will be disabled'
      );
    });

    it('should export full plugin config when both Jest and plugin are installed', async () => {
      const mockRecommendedConfig = { rules: { 'jest/no-disabled-tests': 'warn' } };

      const config = await createJestConfig({
        isModuleAvailable: moduleName => moduleName === 'jest' || moduleName === 'eslint-plugin-jest',
        loadModule: moduleName => {
          if (moduleName === 'eslint-plugin-jest') {
            return Promise.resolve({ configs: { 'flat/recommended': mockRecommendedConfig } });
          }

          return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
        }
      });

      assert.strictEqual(config.name, 'uphold/jest-plugin-config', 'Should have plugin config name');
      assert.ok(config.extends, 'Should have extends');
      assert.ok(Array.isArray(config.extends), 'extends should be an array');
      assert.strictEqual(config.extends.length, 1, 'extends should have one config');
      // @ts-expect-error Incomplete typing for extends.
      assert.strictEqual(config.extends[0].name, 'jest/recommended', 'Extended config should have correct name');
      assert.ok(config.rules, 'Should have rules');
      assert.equal(Object.keys(config.rules).length, 9);
      assert.strictEqual(config.rules['jest/padding-around-describe-blocks'], 'warn');
      assert.strictEqual(config.rules['jest/padding-around-expect-groups'], 'warn');
      assert.strictEqual(config.rules['jest/prefer-equality-matcher'], 'warn');
      assert.strictEqual(config.rules['jest/prefer-to-be'], 'warn');
      assert.strictEqual(config.rules['jest/prefer-to-contain'], 'warn');
      assert.strictEqual(config.rules['jest/prefer-to-have-been-called'], 'warn');
      assert.strictEqual(config.rules['jest/prefer-to-have-been-called-times'], 'warn');
      assert.strictEqual(config.rules['jest/prefer-to-have-length'], 'warn');
      assert.strictEqual(config.rules['jest/prefer-todo'], 'warn');

      assert.ok(!config.languageOptions, 'Plugin config should not have `languageOptions`');
    });
  });
});
