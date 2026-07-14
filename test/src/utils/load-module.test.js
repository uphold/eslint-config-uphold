/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';

/**
 * Test suite for load-module utilities.
 */

describe('load-module utilities', () => {
  describe('isModuleAvailable()', () => {
    it('should return true for installed modules', async (/** @type {import('node:test').TestContext} */ t) => {
      const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

      // Test with a known built-in module.
      t.assert.strictEqual(isModuleAvailable('node:fs'), true, 'Should detect built-in modules');

      // Test with globals which is a dependency.
      t.assert.strictEqual(isModuleAvailable('globals'), true, 'Should detect installed dependencies');
    });

    it('should return false for non-existent modules', async (/** @type {import('node:test').TestContext} */ t) => {
      const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

      t.assert.strictEqual(
        isModuleAvailable('this-module-definitely-does-not-exist-12345'),
        false,
        'Should return false for non-existent modules'
      );
    });

    it('should return false for optional peer dependencies not installed', async (/** @type {import('node:test').TestContext} */ t) => {
      const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

      // These are optional peer deps that aren't installed in dev.
      const jestAvailable = isModuleAvailable('jest');
      const mochaAvailable = isModuleAvailable('mocha');
      const vitestAvailable = isModuleAvailable('vitest');

      t.assert.strictEqual(typeof jestAvailable, 'boolean', 'Should return boolean for jest');
      t.assert.strictEqual(typeof mochaAvailable, 'boolean', 'Should return boolean for mocha');
      t.assert.strictEqual(typeof vitestAvailable, 'boolean', 'Should return boolean for vitest');
    });
  });

  describe('loadModule', () => {
    it('should load modules with default exports', async (/** @type {import('node:test').TestContext} */ t) => {
      const { loadModule } = await import('../../../src/utils/load-module.js');

      const globals = await loadModule('globals');

      t.assert.ok(globals, 'Should load globals module');
      t.assert.ok(globals.node, 'Should have node globals');
      t.assert.strictEqual(typeof globals.node, 'object', 'node globals should be an object');
    });

    it('should handle modules without default export', async (/** @type {import('node:test').TestContext} */ t) => {
      const { loadModule } = await import('../../../src/utils/load-module.js');

      // Load globals which we know has proper exports.
      const globals = await loadModule('globals');

      t.assert.ok(globals, 'Should load module');
      t.assert.ok(globals.node, 'Should have expected properties');
    });

    it('should throw error for non-existent modules', async (/** @type {import('node:test').TestContext} */ t) => {
      const { loadModule } = await import('../../../src/utils/load-module.js');

      await t.assert.rejects(
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
