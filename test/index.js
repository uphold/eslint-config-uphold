/**
 * Module dependencies.
 */

import { ESLint } from 'eslint';
import { join, resolve } from 'node:path';

/**
 * Constants.
 */

const dirname = resolve(import.meta.dirname);

/**
 * Tests for `eslint-config-uphold`.
 */

describe('eslint-config-uphold', () => {
  const linter = new ESLint({ ignore: false, overrideConfigFile: join(dirname, '..', 'src', 'index.js') });

  it('should not generate any violation for correct code', async () => {
    const source = join(dirname, 'fixtures', 'correct.js');
    const results = await linter.lintFiles([source]);

    results[0].messages.should.be.empty();
  });

  it('should generate violations for incorrect code', async () => {
    const source = join(dirname, 'fixtures', 'incorrect.js');
    const results = await linter.lintFiles([source]);
    const rules = results[0].messages.map(violation => violation.ruleId);

    Array.from(rules).should.eql([
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
    const source1 = join(dirname, 'fixtures', 'bin', 'correct.js');
    const source2 = join(dirname, 'fixtures', 'scripts', 'correct.js');
    const results = await linter.lintFiles([source1, source2]);

    results[0].messages.should.be.empty();
    results[1].messages.should.be.empty();
  });
});
