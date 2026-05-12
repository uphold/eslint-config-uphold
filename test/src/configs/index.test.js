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

    assert.ok(configs.javascript, '`javascript` config should be exported');
    assert.ok(configs.jest, '`jest` config should be exported');
    assert.ok(configs.mocha, '`mocha` config should be exported');
    assert.ok(configs.typescript, '`typescript` config should be exported');
    assert.ok(configs.vitest, '`vitest` config should be exported');
  });

  it('should export factory functions', async () => {
    const configs = await import('../../../src/configs/index.js');

    assert.strictEqual(typeof configs.createJavaScriptConfig, 'function', 'createJavaScriptConfig should be exported');
    assert.strictEqual(typeof configs.createTypeScriptConfig, 'function', 'createTypeScriptConfig should be exported');
  });

  for (const configName of ['javascript', 'jest', 'mocha', 'typescript', 'vitest']) {
    it(`should export \`${configName}\` config with correct structure`, async () => {
      const configs = await import('../../../src/configs/index.js');
      const config =
        /** @type {import('eslint').Linter.Config[]} */
        (
          configs[
            /** @type {keyof typeof configs} */
            (configName)
          ]
        );

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
