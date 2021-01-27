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
  const linter = new ESLint({ overrideConfigFile: path.join(__dirname, '..', 'src', 'index.js') });

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
      'array-bracket-spacing',
      'arrow-parens',
      'brace-style',
      'comma-dangle',
      'comma-spacing',
      'comma-style',
      'consistent-this',
      'curly',
      'dot-notation',
      'generator-star-spacing',
      'generator-star-spacing',
      'generator-star-spacing',
      'generator-star-spacing',
      'generator-star-spacing',
      'id-match',
      'indent',
      'key-spacing',
      'keyword-spacing',
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
      'no-multi-spaces',
      'no-multi-str',
      'no-multiple-empty-lines',
      'no-spaced-func',
      'no-this-before-super',
      'no-underscore-dangle',
      'no-unused-vars',
      'object-curly-spacing',
      'object-curly-spacing',
      'one-var',
      'one-var-declaration-per-line',
      'operator-linebreak',
      'padded-blocks',
      'padded-blocks',
      'padding-line-between-statements',
      'prefer-destructuring',
      'prefer-destructuring',
      'quote-props',
      'quote-props',
      'quote-props',
      'quote-props',
      'quotes',
      'rulesdir/explicit-sinon-use-fake-timers',
      'semi',
      'semi-spacing',
      'semi-spacing',
      'sort-imports-es6/sort-imports-es6',
      'sort-keys',
      'space-before-blocks',
      'space-before-function-paren',
      'space-in-parens',
      'space-in-parens',
      'space-infix-ops',
      'space-unary-ops',
      'spaced-comment',
      'sql-template/no-unsafe-query',
      'template-curly-spacing',
      'template-curly-spacing',
      'wrap-iife',
      'yoda'
    ]);
  });
});
