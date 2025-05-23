/**
 * Module dependencies.
 */

import upholdJestConfig from './jest';
import upholdMochaConfig from './mocha';
import upholdVitestConfig from './vitest';

/**
 * Configurations.
 */

const configs = {
  jest: upholdJestConfig,
  mocha: upholdMochaConfig,
  vitest: upholdVitestConfig
};

/**
 * Export the configurations.
 */

export { configs as 'module.exports' };
export default configs;
