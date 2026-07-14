/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';

/**
 * Test suite for config exports.
 */

describe('Test configs', () => {
  it('should export all configs', async (/** @type {import('node:test').TestContext} */ t) => {
    const configs = await import('../../../src/configs/index.js');

    t.assert.ok(configs.javascript, '`javascript` config should be exported');
    t.assert.ok(configs.jest, '`jest` config should be exported');
    t.assert.ok(configs.mocha, '`mocha` config should be exported');
    t.assert.ok(configs.typescript, '`typescript` config should be exported');
    t.assert.ok(configs.vitest, '`vitest` config should be exported');
    t.assert.ok(configs.nodeTest, '`nodeTest` config should be exported');
  });

  it('should export factory functions', async (/** @type {import('node:test').TestContext} */ t) => {
    const configs = await import('../../../src/configs/index.js');

    t.assert.snapshot(Object.keys(configs));
    t.assert.strictEqual(
      typeof configs.createJavaScriptConfig,
      'function',
      'createJavaScriptConfig should be exported'
    );
    t.assert.strictEqual(
      typeof configs.createTypeScriptConfig,
      'function',
      'createTypeScriptConfig should be exported'
    );
  });

  for (const configName of ['javascript', 'jest', 'mocha', 'typescript', 'vitest', 'nodeTest']) {
    it(`should export \`${configName}\` config with correct structure`, async (/** @type {import('node:test').TestContext} */ t) => {
      const configs = await import('../../../src/configs/index.js');
      const config =
        /** @type {import('eslint').Linter.Config[]} */
        (
          configs[
            /** @type {keyof typeof configs} */
            (configName)
          ]
        );

      t.assert.ok(Array.isArray(config), `\`${configName}\` config should be an array`);
      t.assert.ok(config.length > 0, `\`${configName}\` config array should not be empty`);
      t.assert.ok(config[0].name, `\`${configName}\` config should have a name`);
      t.assert.ok(
        config[0].name.startsWith(`uphold/${configName}`),
        `\`${configName}\` config name should start with \`uphold/${configName}\``
      );
    });
  }
});
