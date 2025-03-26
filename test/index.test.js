/**
 * Module dependencies.
 */

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';
import { join, resolve } from 'node:path';

/**
 * Constants.
 */

const dirname = resolve(import.meta.dirname);

/**
 * Test `eslint-config-uphold`.
 */

describe('eslint-config-uphold', () => {
  const linter = new ESLint({ ignore: false, overrideConfigFile: join(dirname, '..', 'src', 'index.js') });

  it('should not generate any violation for correct code', async () => {
    const fixturesCorrect = join(dirname, 'fixtures', 'correct.js');
    const binCorrect = join(dirname, 'fixtures', 'bin', 'correct.js');
    const scriptsCorrect = join(dirname, 'fixtures', 'scripts', 'correct.js');

    const [binResult, fixturesResult, scriptResult] = await linter.lintFiles([
      binCorrect,
      fixturesCorrect,
      scriptsCorrect
    ]);

    expect(binResult.messages).toHaveLength(0);
    expect(fixturesResult.messages).toHaveLength(0);
    expect(scriptResult.messages).toHaveLength(0);
  });

  it('should generate violations for incorrect code', async () => {
    const fixturesIncorrect = join(dirname, 'fixtures', 'incorrect.js');
    const [result] = await linter.lintFiles([fixturesIncorrect]);
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
});
