'use strict';

/**
 * Module dependencies.
 */

const { ESLint } = require('eslint');
const path = require('path');

/**
 * Tests for `eslint-config-uphold`.
 */

describe('eslint-config-uphold', () => {
  const linter = new ESLint({ ignore: false, overrideConfigFile: path.join(__dirname, '..', 'src', 'index.js') });

  it('should not generate any violation for correct code', async () => {
    const source = path.join(__dirname, 'fixtures', 'correct.js');
    const results = await linter.lintFiles([source]);

    results[0].messages.should.be.empty();
  });

  it('should generate violations for incorrect code', async () => {
    const source = path.join(__dirname, 'fixtures', 'incorrect.js');
    const results = await linter.lintFiles([source]);
    const rules = results[0].messages.map(violation => violation.ruleId);

    Array.from(rules).should.eql([
      'consistent-this',
      'curly',
      'dot-notation',
      'id-match',
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
      'no-irregular-whitespace',
      'no-irregular-whitespace',
      'prettier/prettier',
      'no-irregular-whitespace',
      'no-irregular-whitespace',
      'no-labels',
      'no-labels',
      'no-multi-str',
      'no-this-before-super',
      'no-underscore-dangle',
      'no-unused-vars',
      'padding-line-between-statements',
      'padding-line-between-statements',
      'prefer-destructuring',
      'prefer-destructuring',
      'prettier/prettier',
      'prettier/prettier',
      'rulesdir/explicit-sinon-use-fake-timers',
      'sort-imports-es6/sort-imports-es6',
      'sort-keys',
      'spaced-comment',
      'sql-template/no-unsafe-query',
      'yoda'
    ]);
  });
});
