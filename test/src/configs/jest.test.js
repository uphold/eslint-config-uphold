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
  describe('createJestConfig()', () => {
    it('should return a config array when Jest is not installed', async () => {
      const configs = await createJestConfig({
        isModuleAvailable: () => false,
        loadModule: () => Promise.resolve({})
      });

      assert.ok(Array.isArray(configs), 'Should return an array');
      assert.strictEqual(configs.length, 1, 'Should have one config');
      assert.strictEqual(configs[0].name, 'uphold/jest', 'Should have correct config name');
      assert.ok(!configs[0].rules, 'Empty config should not have rules');
      assert.ok(!configs[0].languageOptions, 'Empty config should not have `languageOptions`');
    });

    it('should return globals config when Jest is installed but plugin is not', async context => {
      const warnMock = context.mock.method(console, 'warn');
      const configs = await createJestConfig({
        isModuleAvailable: moduleName => moduleName === 'jest'
      });

      assert.ok(Array.isArray(configs), 'Should return an array');
      assert.strictEqual(configs.length, 1, 'Should have one config');
      assert.strictEqual(configs[0].name, 'uphold/jest', 'Should have correct config name');
      assert.ok(configs[0].languageOptions, 'Should have `languageOptions`');
      assert.ok(configs[0].languageOptions.globals, 'Should have Jest globals defined');
      assert.ok(!configs[0].rules, 'Globals config should not have rules');

      // Verify warning was logged.
      assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have logged a warning');
      assert.strictEqual(
        warnMock.mock.calls[0].arguments[0],
        '`eslint-plugin-jest` is not installed, Jest linting will be disabled'
      );
    });

    it('should return full plugin config when both Jest and plugin are installed', async () => {
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

      assert.ok(Array.isArray(configs), 'Should return an array');
      // defineConfig flattens extends, so we have 2 configs: jest/recommended + uphold/jest.
      assert.strictEqual(configs.length, 2, 'Should have two configs (extended + main)');

      // First config is the extended jest/recommended (prefixed by defineConfig).
      assert.strictEqual(
        configs[0].name,
        'uphold/jest > jest/recommended',
        'First config should be prefixed jest/recommended'
      );

      // Second config is our uphold/jest config with rules.
      assert.strictEqual(configs[1].name, 'uphold/jest', 'Second config should be uphold/jest');
      assert.ok(configs[1].rules, 'Should have rules');
      assert.equal(Object.keys(configs[1].rules).length, 9);
      assert.strictEqual(configs[1].rules['jest/padding-around-describe-blocks'], 'warn');
      assert.strictEqual(configs[1].rules['jest/padding-around-expect-groups'], 'warn');
      assert.strictEqual(configs[1].rules['jest/prefer-equality-matcher'], 'warn');
      assert.strictEqual(configs[1].rules['jest/prefer-to-be'], 'warn');
      assert.strictEqual(configs[1].rules['jest/prefer-to-contain'], 'warn');
      assert.strictEqual(configs[1].rules['jest/prefer-to-have-been-called'], 'warn');
      assert.strictEqual(configs[1].rules['jest/prefer-to-have-been-called-times'], 'warn');
      assert.strictEqual(configs[1].rules['jest/prefer-to-have-length'], 'warn');
      assert.strictEqual(configs[1].rules['jest/prefer-todo'], 'warn');

      assert.ok(!configs[1].languageOptions, 'Plugin config should not have `languageOptions`');
    });
  });
});
