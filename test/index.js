'use strict';

/**
 * Module dependencies.
 */

const { CLIEngine } = require('eslint');
const path = require('path');

/**
 * Tests for `eslint-config-uphold`.
 */

describe('eslint-config-uphold', () => {
  const linter = new CLIEngine({ configFile: path.join(__dirname, '..', 'src', 'index.js') });

  it('should not generate any violation for correct code', () => {
    const source = path.join(__dirname, 'fixtures', 'correct.js');

    linter.executeOnFiles([source]).results[0].messages.should.be.empty();
  });

  it('should generate violations for incorrect code', () => {
    const source = path.join(__dirname, 'fixtures', 'incorrect.js');

    Array.from(linter.executeOnFiles([source]).results[0].messages.map(violation => violation.ruleId)).should.eql([
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
      'newline-before-return',
      'no-class-assign',
      'no-const-assign',
      'no-constant-condition',
      'no-dupe-class-members',
      'no-empty',
      'no-labels',
      'no-labels',
      'no-multi-str',
      'no-this-before-super',
      'no-underscore-dangle',
      'no-unused-vars',
      'padding-line-between-statements',
      'prefer-destructuring',
      'prefer-destructuring',
      'prettier/prettier',
      'prettier/prettier',
      'sort-imports-es6/sort-imports-es6',
      'sort-keys',
      'spaced-comment',
      'sql-template/no-unsafe-query',
      'yoda'
    ]);
  });
});
