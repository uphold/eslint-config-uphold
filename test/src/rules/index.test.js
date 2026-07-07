/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';
import rules from '../../../src/rules/index.js';

/**
 * Test `index`.
 */

describe('rules index', () => {
  it('should export all custom rules', ({ assert }) => {
    assert.snapshot(Object.entries(rules));
  });
});
