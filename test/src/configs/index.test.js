/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Test suite for config exports.
 */

describe('Test configs', () => {
  it('should export all configs', async () => {
    const configs = await import('../../../src/configs/index.js');

    assert.ok(configs.default, '`default export` should exist');
    assert.ok(configs.javascript, '`javascript` config should be exported');
    assert.ok(configs.jest, '`jest` config should be exported');
    assert.ok(configs.mocha, '`mocha` config should be exported');
    assert.ok(configs.typescript, '`typescript` config should be exported');
    assert.ok(configs.vitest, '`vitest` config should be exported');
  });

  it('should support default import', async () => {
    const configs = await import('../../../src/configs/index.js');

    assert.ok(configs.default.javascript, '`default export` should have `javascript`');
    assert.ok(configs.default.jest, '`default export` should have `jest`');
    assert.ok(configs.default.mocha, '`default export` should have `mocha`');
    assert.ok(configs.default.typescript, '`default export` should have `typescript`');
    assert.ok(configs.default.vitest, '`default export` should have `vitest`');
  });

  for (const configName of ['javascript', 'jest', 'mocha', 'typescript', 'vitest']) {
    it(`should export \`${configName}\` config with correct structure`, async () => {
      const configs = await import('../../../src/configs/index.js');
      const config = configs[configName];

      assert.ok(Array.isArray(config), `\`${configName}\` config should be an array`);
      assert.ok(config.length > 0, `\`${configName}\` config array should not be empty`);
      assert.ok(config[0].name, `\`${configName}\` config should have a name`);
      assert.ok(
        config[0].name.startsWith(`uphold/${configName}`),
        `\`${configName}\` config name should start with \`uphold/${configName}\``
      );
    });
  }
});
