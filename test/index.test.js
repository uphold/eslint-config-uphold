/**
 * Module dependencies.
 */

import { ESLint } from 'eslint';
import { describe, it } from 'node:test';
import { join, resolve } from 'node:path';

/**
 * Constants.
 */

const dirname = resolve(import.meta.dirname);

/**
 * Tests for `eslint-config-uphold`.
 * @todo Refactor test using ESLint's RuleTester for valid/invalid cases instead of relying on fixtures.
 */

describe('eslint-config-uphold', () => {
  const linter = new ESLint({ ignore: false, overrideConfigFile: join(dirname, '..', 'src', 'index.js') });

  it('should not generate any violation for correct code', async (/** @type {import('node:test').TestContext} */ t) => {
    const source = join(dirname, 'fixtures', 'correct.js');
    const [result] = await linter.lintFiles([source]);

    t.assert.strictEqual(result.messages.length, 0);
  });

  it('should generate violations for incorrect code', async (/** @type {import('node:test').TestContext} */ t) => {
    const source = join(dirname, 'fixtures', 'incorrect.js');
    const [result] = await linter.lintFiles([source]);
    const rules = result.messages.map(violation => violation.ruleId);

    t.assert.snapshot(rules);
  });

  it('should not generate any violation for correct code inside config folders', async (/** @type {import('node:test').TestContext} */ t) => {
    const source = join(dirname, 'fixtures', 'config', 'correct.js');
    const [result] = await linter.lintFiles([source]);

    t.assert.strictEqual(result.messages.length, 0);
  });

  it('should not generate any violation for correct code inside bin & scripts folders', async (/** @type {import('node:test').TestContext} */ t) => {
    const source1 = join(dirname, 'fixtures', 'bin', 'correct.js');
    const source2 = join(dirname, 'fixtures', 'scripts', 'correct.js');
    const [result1, result2] = await linter.lintFiles([source1, source2]);

    t.assert.strictEqual(result1.messages.length, 0);
    t.assert.strictEqual(result2.messages.length, 0);
  });

  it('should export configs from `src/configs`', async (/** @type {import('node:test').TestContext} */ t) => {
    const rootExports = await import('../src/index.js');

    t.assert.snapshot(Object.keys(rootExports));

    // Verify default export is still the uphold config array.
    t.assert.ok(Array.isArray(rootExports.default), 'default export should be an array');
  });
});
