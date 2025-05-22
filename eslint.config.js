/**
 * Module dependencies.
 */

import { defineConfig, globalIgnores } from 'eslint/config';
import uphold from './src/index.js';

/**
 * `ESLint` configuration.
 */

export default defineConfig([
  uphold,
  {
    files: ['src/configs/*.js'],
    name: 'configs',
    rules: {
      'no-console': 'off'
    }
  },
  globalIgnores(['test/fixtures'])
]);
