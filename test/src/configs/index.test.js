/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Test suite for config exports.
 */

describe('Test configs', () => {
  it('should export all test configs', async () => {
    const configs = await import('../../../src/configs/index.js');

    assert.ok(configs.jest, '`jest` config should be exported');
    assert.ok(configs.mocha, '`mocha` config should be exported');
    assert.ok(configs.vitest, '`vitest` config should be exported');
    assert.ok(configs.default, '`default export` should exist');
  });

  it('should export `jest` config with correct structure', async () => {
    const { jest } = await import('../../../src/configs/index.js');

    assert.ok(Array.isArray(jest), '`jest` config should be an array');
    assert.ok(jest.length > 0, '`jest` config array should not be empty');
    assert.ok(jest[0].name, '`jest` config should have a name');
    assert.ok(jest[0].name.startsWith('uphold/jest'), '`jest` config name should start with `uphold/jest`');
  });

  it('should export `mocha` config with correct structure', async () => {
    const { mocha } = await import('../../../src/configs/index.js');

    assert.ok(Array.isArray(mocha), '`mocha` config should be an array');
    assert.ok(mocha.length > 0, '`mocha` config array should not be empty');
    assert.ok(mocha[0].name, '`mocha` config should have a name');
    assert.ok(mocha[0].name.startsWith('uphold/mocha'), '`mocha` config name should start with `uphold/mocha`');
  });

  it('should export `vitest` config with correct structure', async () => {
    const { vitest } = await import('../../../src/configs/index.js');

    assert.ok(Array.isArray(vitest), '`vitest` config should be an array');
    assert.ok(vitest.length > 0, '`vitest` config array should not be empty');
    assert.ok(vitest[0].name, '`vitest` config should have a name');
    assert.ok(vitest[0].name.startsWith('uphold/vitest'), '`vitest` config name should start with `uphold/vitest`');
  });

  it('should handle missing test frameworks gracefully', async () => {
    const { jest, mocha, vitest } = await import('../../../src/configs/index.js');

    assert.ok(Array.isArray(jest), '`jest` should be an array');
    assert.ok(Array.isArray(mocha), '`mocha` should be an array');
    assert.ok(Array.isArray(vitest), '`vitest` should be an array');
  });

  it('should support default import', async () => {
    const configs = await import('../../../src/configs/index.js');

    assert.ok(configs.default.jest, '`default export` should have `jest`');
    assert.ok(configs.default.mocha, '`default export` should have `mocha`');
    assert.ok(configs.default.vitest, '`default export` should have `vitest`');
  });
});
