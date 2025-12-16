/**
 * Export `rules`.
 *
 * @type {Record<string, import('eslint').Rule.RuleModule>}
 */

import explicitSinonUseFakeTimers from './explicit-sinon-use-fake-timers.js';
import noTrailingPeriodInLogMessages from './no-trailing-period-in-log-messages.js';

export default {
  'explicit-sinon-use-fake-timers': explicitSinonUseFakeTimers,
  'no-trailing-period-in-log-messages': noTrailingPeriodInLogMessages
};
