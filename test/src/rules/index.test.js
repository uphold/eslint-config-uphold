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
    // @ts-expect-error TestContextAssert.deepStrictEqual() is not inferred as expected.
    assert.deepStrictEqual(Object.keys(rules).sort(), [
      'explicit-sinon-use-fake-timers',
      'no-trailing-period-in-log-messages'
    ]);
  });
});
