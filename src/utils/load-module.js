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

/**
 * Module map for dynamic imports.
 *
 * @typedef {{
 *   "eslint-plugin-react": import('eslint-plugin-react'),
 *   "eslint-plugin-react-hooks": import('eslint-plugin-react-hooks'),
 *   "globals": import('globals'),
 *   "react": import('react')
 * }} ModuleMap
 */

/**
 * Load a module dynamically with proper typing.
 *
 * @template {keyof ModuleMap} T
 * @param {T} moduleName - Module to load.
 * @returns {Promise<ModuleMap[T]>} Loaded module.
 */
async function loadModule(moduleName) {
  const module = await import(moduleName);

  return module.default || module;
}

export { isModuleAvailable, loadModule };
