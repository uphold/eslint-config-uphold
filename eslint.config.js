/**
 * Module dependencies.
 */

import { defineConfig, globalIgnores } from 'eslint/config';
import { eslintRules } from './src/configs/common.js';
import uphold from './src/index.js';

/**
 * `ESLint` configuration.
 */

export default defineConfig([
  uphold,
  {
    name: 'preserve-existing-object-wrapping',
    rules: {
      'prettier/prettier': ['error', { ...eslintRules['prettier/prettier'][1], objectWrap: 'preserve' }]
    }
  },
  {
    files: ['src/configs/*.js'],
    name: 'configs',
    rules: {
      'no-console': 'off'
    }
  },
  globalIgnores(['test/fixtures'])
]);
