/**
 * Export `rules`.
 *
 * @type {Record<string, import('eslint').Rule.RuleModule>}
 */

import databaseMigrationFilenameFormat from './database-migration-filename-format.js';
import explicitSinonUseFakeTimers from './explicit-sinon-use-fake-timers.js';
import noTrailingPeriodInLogMessages from './no-trailing-period-in-log-messages.js';
import requireCommentPunctuation from './require-comment-punctuation.js';

export default {
  'database-migration-filename-format': databaseMigrationFilenameFormat,
  'explicit-sinon-use-fake-timers': explicitSinonUseFakeTimers,
  'no-trailing-period-in-log-messages': noTrailingPeriodInLogMessages,
  'require-comment-punctuation': requireCommentPunctuation
};
