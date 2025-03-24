'use strict';

/**
 * Export `rules`.
 *
 * @type {Record<string, import('eslint').Rule.RuleModule>}
 */

module.exports = {
  'explicit-sinon-use-fake-timers': require('./explicit-sinon-use-fake-timers.js')
};
