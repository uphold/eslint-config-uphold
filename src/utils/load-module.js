/**
 * Module dependencies.
 */

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/**
 * Check if a module is available.
 * @param {string} moduleName - Name of module to check.
 * @returns {boolean} Whether the module is available.
 */
function isModuleAvailable(moduleName) {
  try {
    require.resolve(moduleName);

    return true;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return false;
    }

    throw error;
  }
}

export { isModuleAvailable };
