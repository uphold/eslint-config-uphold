/**
 * Module dependencies.
 */

import { createJavaScriptConfig } from './configs/javascript.js';
import { defineConfig } from 'eslint/config';

/**
 * Default Uphold ESLint configuration preset.
 * - Uses CommonJS with ECMAScript 2024 by default.
 * @type {import('eslint').Linter.Config[]}
 */
export default defineConfig([
  createJavaScriptConfig('commonjs', { ecmaVersion: 2024 }),
  {
    rules: {
      'uphold-plugin/explicit-sinon-use-fake-timers': 'error'
    }
  }
]);

/**
 * Re-export all configs from src/configs/index.js.
 */

export {
  createJavaScriptConfig,
  createTypeScriptConfig,
  javascript,
  jest,
  mocha,
  typescript,
  vitest
} from './configs/index.js';
