/**
 * Module dependencies.
 */

import { defineConfig, globalIgnores } from 'eslint/config';
import uphold, { nodeTest } from './src/index.js';

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
  {
    extends: [nodeTest],
    files: ['test/**/*.js'],
    name: 'tests'
  },
  globalIgnores(['test/fixtures'])
]);
