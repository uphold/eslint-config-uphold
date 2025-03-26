/**
 * Module dependencies.
 */

import { defineConfig, globalIgnores } from 'eslint/config';
import uphold from './src/index.js';

/**
 * `ESLint` configuration.
 */

export default defineConfig([
  {
    extends: [uphold],
    name: 'uphold-config'
  },
  globalIgnores(['test/fixtures'])
]);
