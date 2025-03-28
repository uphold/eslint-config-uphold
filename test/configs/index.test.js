/**
 * Module dependencies.
 */

import { ESLint } from 'eslint';
import { describe, it } from 'node:test';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import upholdNode from '../../src/configs/node.js';

/**
 * Tests for `eslint-config-uphold/node`.
 */

describe('eslint-config-uphold/node', () => {
  const linter = new ESLint({
    cwd: resolve(import.meta.dirname, '..'),
    ignore: false,
    overrideConfig: upholdNode,
    overrideConfigFile: true
  });

  it('should not generate any violation for correct code', async () => {
    const [result] = await linter.lintFiles(['fixtures/correct.js']);

    assert.equal(result.messages.length, 0);
  });

  it('should generate violations for incorrect code', async () => {
    const [result] = await linter.lintFiles(['fixtures/incorrect.js']);
    const rules = result.messages.map(violation => violation.ruleId);

    assert.deepEqual(rules, [
      'array-callback-return',
      'no-console',
      'consistent-this',
      'curly',
      'dot-notation',
      'id-match',
      'jsdoc/require-description-complete-sentence',
      'jsdoc/require-description-complete-sentence',
      'mocha/no-exclusive-tests',
      'mocha/no-identical-title',
      'mocha/no-nested-tests',
      'mocha/no-sibling-hooks',
      'no-new',
      'new-cap',
      'no-class-assign',
      'no-const-assign',
      'no-constant-condition',
      'no-dupe-class-members',
      'no-dupe-keys',
      'no-irregular-whitespace',
      'no-irregular-whitespace',
      'prettier/prettier',
      'no-irregular-whitespace',
      'no-irregular-whitespace',
      'no-labels',
      'no-labels',
      'prettier/prettier',
      'no-multi-str',
      'no-this-before-super',
      'no-underscore-dangle',
      'no-unused-vars',
      'prefer-destructuring',
      'prefer-destructuring',
      'prettier/prettier',
      'prettier/prettier',
      'promise/prefer-await-to-then',
      'uphold-plugin/explicit-sinon-use-fake-timers',
      'sort-destructure-keys/sort-destructure-keys',
      'sort-destructure-keys/sort-destructure-keys',
      'sort-destructure-keys/sort-destructure-keys',
      'sort-imports-requires/sort-imports',
      'sort-imports-requires/sort-requires',
      'sort-keys-fix/sort-keys-fix',
      'stylistic/padding-line-between-statements',
      'stylistic/padding-line-between-statements',
      'stylistic/spaced-comment',
      'sql-template/no-unsafe-query',
      'yoda'
    ]);
  });

  it('should not generate any violation for correct code inside bin & scripts folders', async () => {
    const [result1, result2] = await linter.lintFiles(['fixtures/bin/correct.js', 'fixtures/scripts/correct.js']);

    assert.equal(result1.messages.length, 0);
    assert.equal(result2.messages.length, 0);
  });
});
