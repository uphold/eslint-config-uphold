/**
 * Module dependencies.
 */

import { ESLint } from 'eslint';
import { describe, it } from 'node:test';
import { join, resolve } from 'node:path';

/**
 * Constants.
 */

const dirname = resolve(import.meta.dirname);

/**
 * Tests for `eslint-config-uphold/react`.
 */

describe('eslint-config-uphold/react', () => {
  const linter = new ESLint({
    ignore: false,
    overrideConfigFile: join(dirname, '..', '..', '..', 'src', 'configs', 'react.js')
  });

  it('should not generate any violations for `react/prefer-stateless-function` in correct code', async test => {
    const source = join(dirname, '..', '..', 'fixtures', 'react', 'correct.js');
    const [result] = await linter.lintFiles([source]);

    test.assert.equal(result.messages.length, 0);
  });

  it('should generate violations for `react/prefer-stateless-function` in incorrect code', async test => {
    const fixturesIncorrect = join(dirname, '..', '..', 'fixtures', 'react', 'incorrect.js');
    const [result] = await linter.lintFiles([fixturesIncorrect]);

    const violations = result.messages.map(({ column, line, ruleId, severity }) => ({
      column,
      line,
      ruleId,
      severity
    }));

    test.assert.snapshot(violations);
  });
});
