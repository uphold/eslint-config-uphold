/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Test suite for Vitest config.
 *
 * Note: These tests are environment-dependent since the config uses top-level await.
 * The config is evaluated on import, making it difficult to mock installation states.
 * Tests verify behavior based on what's actually installed in the test environment.
 */

describe('Vitest config', () => {
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

  it('should export empty config when Vitest is not installed', async () => {
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');
    const vitestConfig = await import('../../../src/configs/vitest.js');

    const isVitestInstalled = isModuleAvailable('vitest');

    if (!isVitestInstalled) {
      assert.strictEqual(
        vitestConfig.default.name,
        'uphold/vitest-empty',
        'Should have empty config name when Vitest not installed'
      );
      assert.ok(!vitestConfig.default.languageOptions, 'Empty config should not have languageOptions');
      assert.ok(!vitestConfig.default.extends, 'Empty config should not have extends');
      assert.ok(!vitestConfig.default.rules, 'Empty config should not have rules');
    } else {
      // Skip test if Vitest is installed.
      assert.ok(true, 'Vitest is installed, skipping empty config test');
    }
  });

  it('should export globals config when Vitest is installed but plugin is not', async () => {
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');
    const vitestConfig = await import('../../../src/configs/vitest.js');

    const isVitestInstalled = isModuleAvailable('vitest');
    const isPluginInstalled = isModuleAvailable('@vitest/eslint-plugin');
    const isTypeScriptInstalled = isModuleAvailable('typescript');

    if (isVitestInstalled && (!isPluginInstalled || !isTypeScriptInstalled)) {
      assert.strictEqual(
        vitestConfig.default.name,
        'uphold/vitest-globals',
        'Should have globals config name when plugin or TypeScript not installed'
      );
      assert.ok(vitestConfig.default.languageOptions, 'Should have languageOptions');
      assert.ok(vitestConfig.default.languageOptions.globals, 'Should have globals defined');
      assert.strictEqual(typeof vitestConfig.default.languageOptions.globals, 'object', 'globals should be an object');
      assert.ok(!vitestConfig.default.extends, 'Should not have extends when plugin missing');
    } else {
      // Skip test if conditions aren't met.
      assert.ok(true, 'Test environment does not match this scenario, skipping');
    }
  });

  it('should export full plugin config when Vitest, TypeScript, and plugin are installed', async () => {
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');
    const vitestConfig = await import('../../../src/configs/vitest.js');

    const isVitestInstalled = isModuleAvailable('vitest');
    const isPluginInstalled = isModuleAvailable('@vitest/eslint-plugin');
    const isTypeScriptInstalled = isModuleAvailable('typescript');

    if (isVitestInstalled && isPluginInstalled && isTypeScriptInstalled) {
      assert.strictEqual(
        vitestConfig.default.name,
        'uphold/vitest-plugin-config',
        'Should have plugin config name when all dependencies installed'
      );
      assert.ok(vitestConfig.default.extends, 'Should have extends');
      assert.ok(Array.isArray(vitestConfig.default.extends), 'extends should be an array');
      assert.ok(vitestConfig.default.extends.length > 0, 'extends should not be empty');

      assert.ok(vitestConfig.default.rules, 'Should have rules');
      assert.ok(typeof vitestConfig.default.rules === 'object', 'rules should be an object');

      assert.ok(vitestConfig.default.languageOptions, 'Should have languageOptions');

      // Verify custom rules are present and have correct severity.
      const { rules } = vitestConfig.default;

      assert.strictEqual(rules['vitest/no-commented-out-tests'], 'warn', 'no-commented-out-tests should be warn');
      assert.strictEqual(rules['vitest/no-disabled-tests'], 'warn', 'no-disabled-tests should be warn');
      assert.strictEqual(rules['vitest/no-focused-tests'], 'error', 'no-focused-tests should be error');
      assert.strictEqual(
        rules['vitest/no-interpolation-in-snapshots'],
        'error',
        'no-interpolation-in-snapshots should be error'
      );
      assert.strictEqual(rules['vitest/no-mocks-import'], 'error', 'no-mocks-import should be error');
      assert.strictEqual(rules['vitest/no-standalone-expect'], 'error', 'no-standalone-expect should be error');
      assert.strictEqual(rules['vitest/no-test-prefixes'], 'error', 'no-test-prefixes should be error');
      assert.strictEqual(rules['vitest/prefer-expect-resolves'], 'warn', 'prefer-expect-resolves should be warn');
      assert.strictEqual(rules['vitest/prefer-to-have-length'], 'warn', 'prefer-to-have-length should be warn');
    } else {
      // Skip test if not all dependencies are installed.
      assert.ok(true, 'Not all dependencies installed, skipping full plugin config test');
    }
  });

  it('should match exactly one of the three config states', async () => {
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');
    const vitestConfig = await import('../../../src/configs/vitest.js');

    const isVitestInstalled = isModuleAvailable('vitest');
    const isPluginInstalled = isModuleAvailable('@vitest/eslint-plugin');
    const isTypeScriptInstalled = isModuleAvailable('typescript');

    const configStates = [
      vitestConfig.default.name === 'uphold/vitest-empty',
      vitestConfig.default.name === 'uphold/vitest-globals',
      vitestConfig.default.name === 'uphold/vitest-plugin-config'
    ];

    const matchedStates = configStates.filter(Boolean);

    assert.strictEqual(
      matchedStates.length,
      1,
      `Config should match exactly one state, but matched ${matchedStates.length}`
    );

    // Verify the state matches installation conditions.
    if (!isVitestInstalled) {
      assert.strictEqual(vitestConfig.default.name, 'uphold/vitest-empty', 'Should be empty when Vitest not installed');
    } else if (!isPluginInstalled || !isTypeScriptInstalled) {
      assert.strictEqual(
        vitestConfig.default.name,
        'uphold/vitest-globals',
        'Should be globals-only when plugin/TypeScript missing'
      );
    } else {
      assert.strictEqual(
        vitestConfig.default.name,
        'uphold/vitest-plugin-config',
        'Should be full plugin config when all installed'
      );
    }
  });
});
