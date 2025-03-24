/**
 * Module dependencies.
 */

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import baseConfig from '../src/index.js';

/**
 * Instances.
 */

const linter = new ESLint({ baseConfig, ignore: false });

/**
 * Test `eslint-config-uphold`.
 */

describe('eslint-config-uphold', () => {
  it('should not generate any violation for correct code', async () => {
    const source = resolve(import.meta.dirname, 'fixtures/correct.js');
    const [result] = await linter.lintFiles([source]);

    expect(result.messages).toHaveLength(0);
  });

  it('should generate violations for incorrect code', async () => {
    const source = resolve(import.meta.dirname, 'fixtures/incorrect.js');
    const [result] = await linter.lintFiles([source]);
    const rules = result.messages.map(violation => violation.ruleId);
    const violations = result.messages.map(({ column, line, ruleId, severity }) => ({
      column,
      line,
      ruleId,
      severity
    }));

    expect(violations).toMatchSnapshot();
    expect(Array.from(rules)).toEqual([
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
    const binCorrect = resolve(import.meta.dirname, 'fixtures/bin/correct.js');
    const scriptsCorrect = resolve(import.meta.dirname, 'fixtures/scripts/correct.js');
    const [binResult, scriptResult] = await linter.lintFiles([binCorrect, scriptsCorrect]);

    expect(binResult.messages).toHaveLength(0);
    expect(scriptResult.messages).toHaveLength(0);
  });
});
