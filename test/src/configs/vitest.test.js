/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Test suite for Vitest config.
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
    const vitestConfig = await import('../../../src/configs/vitest.js');
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

    const isVitestInstalled = isModuleAvailable('vitest');

    if (!isVitestInstalled) {
      assert.strictEqual(
        vitestConfig.default.name,
        'uphold/vitest-empty',
        'Should have empty config name when Vitest not installed'
      );
      assert.ok(!vitestConfig.default.languageOptions, 'Empty config should not have languageOptions');
    }
  });

  it('should export globals config when Vitest is installed', async () => {
    const vitestConfig = await import('../../../src/configs/vitest.js');
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

    const isVitestInstalled = isModuleAvailable('vitest');

    if (isVitestInstalled) {
      assert.strictEqual(
        vitestConfig.default.name,
        'uphold/vitest-globals',
        'Should have globals config name when Vitest is installed'
      );
      assert.ok(vitestConfig.default.languageOptions, 'Should have languageOptions');
      assert.ok(vitestConfig.default.languageOptions.globals, 'Should have globals defined');
    }
  });

  it('should not have extends or rules (plugin support not yet implemented)', async () => {
    const vitestConfig = await import('../../../src/configs/vitest.js');

    // Vitest config only provides globals, no plugin integration yet
    assert.ok(!vitestConfig.default.extends, 'Should not have extends (not yet implemented)');
    assert.ok(!vitestConfig.default.rules, 'Should not have rules (not yet implemented)');
  });
});
