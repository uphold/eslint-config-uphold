/**
 * Export `rules`.
 *
 * @type {Record<string, import('eslint').Rule.RuleModule>}
 */

import explicitSinonUseFakeTimers from './explicit-sinon-use-fake-timers.js';

export default {
  'explicit-sinon-use-fake-timers': explicitSinonUseFakeTimers
};
