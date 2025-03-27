/**
 * Module dependencies.
 */

import rule from '../../src/rules/explicit-sinon-use-fake-timers.js';

const name = 'explicit-sinon-use-fake-timers';
const tests = {
  invalid: [
    {
      code: 'sinon.useFakeTimers();',
      errors: [{ message: 'Must pass an object with `toFake` configuration' }]
    },
    {
      code: 'sinon.useFakeTimers(123);',
      errors: [{ message: 'Not an object' }]
    },
    {
      code: 'sinon.useFakeTimers({});',
      errors: [{ message: 'Object must contain `toFake` configuration' }]
    }
  ],
  valid: [
    {
      code: `sinon.useFakeTimers({ toFake: ['Date'] });`
    }
  ]
};

export { name, rule, tests };
