/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Test suite for Jest config.
 */

describe('Jest config', () => {
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

  it('should export empty config when Jest is not installed', async () => {
    const jestConfig = await import('../../../src/configs/jest.js');
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

    const isJestInstalled = isModuleAvailable('jest');

    if (!isJestInstalled) {
      assert.strictEqual(
        jestConfig.default.name,
        'uphold/jest-empty',
        'Should have empty config name when Jest not installed'
      );
      assert.ok(!jestConfig.default.extends, 'Empty config should not have extends');
      assert.ok(!jestConfig.default.rules, 'Empty config should not have rules');
    }
  });

  it('should export globals config when Jest is installed but plugin is not', async () => {
    const jestConfig = await import('../../../src/configs/jest.js');
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

    const isJestInstalled = isModuleAvailable('jest');
    const isPluginInstalled = isModuleAvailable('eslint-plugin-jest');

    if (isJestInstalled && !isPluginInstalled) {
      assert.strictEqual(
        jestConfig.default.name,
        'uphold/jest-globals',
        'Should have globals config name when plugin not installed'
      );
      assert.ok(jestConfig.default.languageOptions, 'Should have languageOptions');
      assert.ok(jestConfig.default.languageOptions.globals, 'Should have globals defined');
    }
  });

  it('should export full plugin config when both Jest and plugin are installed', async () => {
    const jestConfig = await import('../../../src/configs/jest.js');
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

    const isJestInstalled = isModuleAvailable('jest');
    const isPluginInstalled = isModuleAvailable('eslint-plugin-jest');

    if (isJestInstalled && isPluginInstalled) {
      assert.strictEqual(
        jestConfig.default.name,
        'uphold/jest-plugin-config',
        'Should have plugin config name when both installed'
      );
      assert.ok(jestConfig.default.extends, 'Should have extends');
      assert.ok(jestConfig.default.rules, 'Should have rules');
      assert.ok(Array.isArray(jestConfig.default.extends), 'extends should be an array');

      const { rules } = jestConfig.default;

      assert.strictEqual(rules['jest/padding-around-describe-blocks'], 'warn');
      assert.strictEqual(rules['jest/padding-around-expect-groups'], 'warn');
      assert.strictEqual(rules['jest/prefer-called-with'], 'warn');
      assert.strictEqual(rules['jest/prefer-spy-on'], 'warn');
      assert.strictEqual(rules['jest/prefer-to-be'], 'warn');
      assert.strictEqual(rules['jest/prefer-to-contain'], 'warn');
      assert.strictEqual(rules['jest/prefer-to-have-length'], 'warn');
      assert.strictEqual(rules['jest/prefer-todo'], 'warn');
    }
  });
});
