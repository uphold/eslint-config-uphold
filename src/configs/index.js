/**
 * Module dependencies.
 */

import javascriptConfig from './javascript.js';
import typescriptConfig from './typescript.js';

/**
 * Configurations.
 */

const configs = {
  javascript: javascriptConfig,
  typescript: typescriptConfig
};

/**
 * Export the configurations.
 */

export { configs as 'module.exports' };
export default configs;
