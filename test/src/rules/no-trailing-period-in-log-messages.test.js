/**
 * Module dependencies.
 */

import { RuleTester } from 'eslint';
import { describe, it } from 'node:test';
import noTrailingPeriodInLogMessages from '../../../src/rules/no-trailing-period-in-log-messages.js';

/**
 * Tests for `no-trailing-period-in-log-messages` rule.
 */

describe('no-trailing-period-in-log-messages', () => {
  const ruleTester = new RuleTester();

  it('should validate standard log messages', (/** @type {import('node:test').TestContext} */ t) => {
    ruleTester.run('no-trailing-period-in-log-messages', noTrailingPeriodInLogMessages, {
      invalid: [
        {
          code: 'console.log("Hello world.")',
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: 'console.log("Hello world")'
        },
        {
          code: "console.info('Processing complete.')",
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: "console.info('Processing complete')"
        },
        {
          code: 'console.log("Loading..")',
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: 'console.log("Loading...")'
        }
      ],
      valid: [
        { code: 'console.log("Hello world")' },
        { code: 'console.info("Processing complete")' },
        { code: 'console.log("Loading...")' },
        { code: 'console.log()' },
        { code: 'console.log(123)' }
      ]
    });

    t.assert.ok(ruleTester);
  });

  it('should validate template literals', (/** @type {import('node:test').TestContext} */ t) => {
    ruleTester.run('no-trailing-period-in-log-messages', noTrailingPeriodInLogMessages, {
      invalid: [
        {
          code: 'console.log(`Hello world.`)',
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: 'console.log(`Hello world`)'
        },
        {
          code: 'console.log(`Processing ${item}.`)',
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: 'console.log(`Processing ${item}`)'
        },
        {
          code: 'console.log(`Loading..`)',
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: 'console.log(`Loading...`)'
        }
      ],
      valid: [{ code: 'console.log(`Hello ${name}`)' }, { code: 'console.log(`Processing ${item}...`)' }]
    });

    t.assert.ok(ruleTester);
  });

  it('should support custom methods', (/** @type {import('node:test').TestContext} */ t) => {
    ruleTester.run('no-trailing-period-in-log-messages', noTrailingPeriodInLogMessages, {
      invalid: [
        {
          code: 'logger.verbose("Processing.")',
          errors: [{ messageId: 'noTrailingPeriod' }],
          options: [{ additionalMethods: ['verbose'] }],
          output: 'logger.verbose("Processing")'
        }
      ],
      valid: [
        {
          code: 'logger.verbose("Processing")',
          options: [{ additionalMethods: ['verbose'] }]
        },
        {
          code: 'logger.custom("Hello.")',
          options: [{ additionalMethods: ['verbose'] }]
        }
      ]
    });

    t.assert.ok(ruleTester);
  });

  it('should support bracket notation', (/** @type {import('node:test').TestContext} */ t) => {
    ruleTester.run('no-trailing-period-in-log-messages', noTrailingPeriodInLogMessages, {
      invalid: [
        {
          code: "console['log']('Hello world.')",
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: "console['log']('Hello world')"
        },
        {
          code: "const method = 'log'; logger[method]('Hello world.')",
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: "const method = 'log'; logger[method]('Hello world')"
        }
      ],
      valid: [
        { code: "console['log']('Hello world')" },
        { code: "const method = 'log'; logger[method]('Hello world')" }
      ]
    });

    t.assert.ok(ruleTester);
  });

  it('should support destructured methods', (/** @type {import('node:test').TestContext} */ t) => {
    ruleTester.run('no-trailing-period-in-log-messages', noTrailingPeriodInLogMessages, {
      invalid: [
        {
          code: "const { log } = console; log('Hello world.')",
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: "const { log } = console; log('Hello world')"
        },
        {
          code: "const { error: errorFn } = logger; errorFn('Failed.')",
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: "const { error: errorFn } = logger; errorFn('Failed')"
        }
      ],
      valid: [
        { code: "const { log } = console; log('Hello world')" },
        { code: "const { error: errorFn } = logger; errorFn('Failed')" }
      ]
    });

    t.assert.ok(ruleTester);
  });

  it('should support second argument messages', (/** @type {import('node:test').TestContext} */ t) => {
    ruleTester.run('no-trailing-period-in-log-messages', noTrailingPeriodInLogMessages, {
      invalid: [
        {
          code: "logger.info({ context: 'value' }, 'Processing complete.')",
          errors: [{ messageId: 'noTrailingPeriod' }],
          output: "logger.info({ context: 'value' }, 'Processing complete')"
        }
      ],
      valid: [{ code: "logger.info({ context: 'value' }, 'Processing complete')" }]
    });

    t.assert.ok(ruleTester);
  });
});
