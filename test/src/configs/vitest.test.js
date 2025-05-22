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

    it('should not have extends or rules (plugin support not yet implemented)', async () => {
      const vitestConfig = await import('../../../src/configs/vitest.js');

      assert.ok(!vitestConfig.default.extends, 'Should not have extends (not yet implemented)');
      assert.ok(!vitestConfig.default.rules, 'Should not have rules (not yet implemented)');
    });
  });

  describe('createVitestConfig()', () => {
    it('should export an empty config when Vitest is not installed', () => {
      const config = createVitestConfig({
        isModuleAvailable: () => false
      });

      assert.strictEqual(config.name, 'uphold/vitest-empty', 'Should have empty config name');
      assert.ok(!config.languageOptions, 'Empty config should not have `languageOptions`');
    });

    it('should export globals config when Vitest is installed', () => {
      const config = createVitestConfig({
        isModuleAvailable: moduleName => moduleName === 'vitest'
      });

      assert.strictEqual(
        config.name,
        'uphold/vitest-globals',
        'Should have globals config name when Vitest is installed'
      );
      assert.ok(config.languageOptions, 'Should have `languageOptions`');
      assert.ok(config.languageOptions.globals, 'Should have Vitest globals defined');
    });
  });
});
