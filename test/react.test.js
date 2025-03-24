/**
 * Module dependencies.
 */

import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import baseConfig from '../src/react.js';

/**
 * Instances.
 */

const linter = new ESLint({ baseConfig, ignore: false });

/**
 * Tests `eslint-config-uphold/react`.
 */

describe('eslint-config-uphold/react', () => {
  it('should not generate any violations for `react/prefer-stateless-function` in correct code', async () => {
    const source = resolve(import.meta.dirname, 'fixtures/react/correct.js');
    const [result] = await linter.lintFiles([source]);

    expect(result.errorCount).toEqual(0);
  });

  it('should generate violations for `react/prefer-stateless-function` in incorrect code', async () => {
    const source = resolve(import.meta.dirname, 'fixtures/react/incorrect.js');
    const [result] = await linter.lintFiles([source]);

    const violations = result.messages.map(({ column, line, ruleId, severity }) => ({
      column,
      line,
      ruleId,
      severity
    }));

    expect(violations).toMatchSnapshot();
  });
});
