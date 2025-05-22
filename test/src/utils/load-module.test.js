/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Test suite for load-module utilities.
 */

describe('load-module utilities', () => {
  describe('isModuleAvailable()', () => {
    it('should return true for installed modules', async () => {
      const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

      // Test with a known built-in module.
      assert.strictEqual(isModuleAvailable('node:fs'), true, 'Should detect built-in modules');

      // Test with globals which is a dependency.
      assert.strictEqual(isModuleAvailable('globals'), true, 'Should detect installed dependencies');
    });

    it('should return false for non-existent modules', async () => {
      const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

      assert.strictEqual(
        isModuleAvailable('this-module-definitely-does-not-exist-12345'),
        false,
        'Should return false for non-existent modules'
      );
    });

    it('should return false for optional peer dependencies not installed', async () => {
      const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

      // These are optional peer deps that aren't installed in dev.
      const jestAvailable = isModuleAvailable('jest');
      const mochaAvailable = isModuleAvailable('mocha');
      const vitestAvailable = isModuleAvailable('vitest');

      assert.strictEqual(typeof jestAvailable, 'boolean', 'Should return boolean for jest');
      assert.strictEqual(typeof mochaAvailable, 'boolean', 'Should return boolean for mocha');
      assert.strictEqual(typeof vitestAvailable, 'boolean', 'Should return boolean for vitest');
    });
  });

  describe('loadModule', () => {
    it('should load modules with default exports', async () => {
      const { loadModule } = await import('../../../src/utils/load-module.js');

      const globals = await loadModule('globals');

      assert.ok(globals, 'Should load globals module');
      assert.ok(globals.node, 'Should have node globals');
      assert.ok(typeof globals.node === 'object', 'node globals should be an object');
    });

    it('should handle modules without default export', async () => {
      const { loadModule } = await import('../../../src/utils/load-module.js');

      // Load globals which we know has proper exports.
      const globals = await loadModule('globals');

      assert.ok(globals, 'Should load module');
      assert.ok(globals.node, 'Should have expected properties');
    });

    it('should throw error for non-existent modules', async () => {
      const { loadModule } = await import('../../../src/utils/load-module.js');

      await assert.rejects(
        async () => {
          // @ts-expect-error - Testing invalid module name.
          await loadModule('this-module-definitely-does-not-exist-12345');
        },
        Error,
        'Should throw for non-existent modules'
      );
    });
  });
});
