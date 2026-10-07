/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';
import { javascript, prettierOptions } from '../../src/index.js';
import assert from 'node:assert/strict';

/**
 * Test suite for the entry point exports.
 */

describe('Test index', () => {
  it('should export the Prettier options used by the `prettier/prettier` rule', () => {
    const { rules } = javascript.findLast(({ rules }) => Array.isArray(rules?.['prettier/prettier']));

    assert.deepEqual(prettierOptions, {
      arrowParens: 'avoid',
      printWidth: 120,
      singleQuote: true,
      trailingComma: 'none'
    });
    assert.deepEqual(rules['prettier/prettier'], ['error', prettierOptions]);
  });
});
