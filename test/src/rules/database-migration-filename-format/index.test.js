/**
 * Module dependencies.
 */

import { ESLint } from 'eslint';
import { describe, it } from 'node:test';
import { join, relative, resolve } from 'node:path';
import assert from 'node:assert/strict';

/**
 * Constants.
 */

const dirname = resolve(import.meta.dirname);

/**
 * Tests for `database-migration-filename-format` rule.
 */

describe('database-migration-filename-format', () => {
  const linter = new ESLint({
    ignore: false,
    overrideConfig: {
      files: ['**/fixtures/**/!(ignored).js'],
      rules: { 'uphold-plugin/database-migration-filename-format': ['error'] }
    },
    overrideConfigFile: join(process.cwd(), 'src', 'index.js')
  });

  it('should not generate any violation for correct database migration file names', async () => {
    const source = join(dirname, 'fixtures', 'correct', '*.js');
    const results = await linter.lintFiles([source]);
    const rules = results.map(({ filePath, messages }) => ({
      filePath: relative(dirname, filePath),
      ruleIds: messages.map(violation => violation.ruleId)
    }));

    assert.deepEqual(rules, [
      {
        filePath: 'fixtures/correct/20251212175000-foo-bar-123.js',
        ruleIds: []
      },
      {
        filePath: 'fixtures/correct/ignored.js',
        ruleIds: []
      }
    ]);
  });

  it('should generate violations for incorrect database migration file names', async () => {
    const source = join(dirname, 'fixtures', 'incorrect', '*.js');
    const results = await linter.lintFiles([source]);
    const rules = results.map(({ filePath, messages }) => ({
      filePath: relative(dirname, filePath),
      ruleIds: messages.map(violation => violation.ruleId)
    }));

    assert.deepEqual(rules, [
      {
        filePath: 'fixtures/incorrect/20251212-missing-time-and-name.js',
        ruleIds: ['uphold-plugin/database-migration-filename-format']
      },
      {
        filePath: 'fixtures/incorrect/20251212175000-Malformed-Name.js',
        ruleIds: ['uphold-plugin/database-migration-filename-format']
      },
      {
        filePath: 'fixtures/incorrect/20251212175000-malformed_name.js',
        ruleIds: ['uphold-plugin/database-migration-filename-format']
      },
      {
        filePath: 'fixtures/incorrect/202512121838-.js',
        ruleIds: ['uphold-plugin/database-migration-filename-format']
      },
      {
        filePath: 'fixtures/incorrect/202512121838-malformed-time.js',
        ruleIds: ['uphold-plugin/database-migration-filename-format']
      },
      {
        filePath: 'fixtures/incorrect/202512121838.js',
        ruleIds: ['uphold-plugin/database-migration-filename-format']
      },
      {
        filePath: 'fixtures/incorrect/202513341838-malformed-date.js',
        ruleIds: ['uphold-plugin/database-migration-filename-format']
      },
      {
        filePath: 'fixtures/incorrect/21001212183800-future-date-time.js',
        ruleIds: ['uphold-plugin/database-migration-filename-format']
      },
      {
        filePath: 'fixtures/incorrect/ignored.js',
        ruleIds: []
      }
    ]);
  });
});
