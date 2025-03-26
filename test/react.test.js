/**
 * Module dependencies.
 */

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';
import { join, resolve } from 'node:path';

/**
 * Constants.
 */

const dirname = resolve(import.meta.dirname);

/**
 * Tests `eslint-config-uphold/react`.
 */

describe('eslint-config-uphold/react', () => {
  const linter = new ESLint({ ignore: false, overrideConfigFile: join(dirname, '..', 'src', 'react.js') });

  it('should not generate any violations for `react/prefer-stateless-function` in correct code', async () => {
    const fixturesCorrect = join(dirname, 'fixtures', 'react', 'correct.js');
    const [result] = await linter.lintFiles([fixturesCorrect]);

    expect(result.errorCount).toEqual(0);
  });

  it('should generate violations for `react/prefer-stateless-function` in incorrect code', async () => {
    const fixturesIncorrect = join(dirname, 'fixtures', 'react', 'incorrect.js');
    const [result] = await linter.lintFiles([fixturesIncorrect]);

    const violations = result.messages.map(({ column, line, ruleId, severity }) => ({
      column,
      line,
      ruleId,
      severity
    }));

    expect(violations).toMatchSnapshot();
  });
});
