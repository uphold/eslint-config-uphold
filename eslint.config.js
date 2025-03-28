/**
 * Module dependencies.
 */

import { defineConfig, globalIgnores } from 'eslint/config';
import upholdNode from './src/configs/node.js';

/**
 * `ESLint` configuration.
 */

export default defineConfig([
  {
    extends: [upholdNode],
    name: 'uphold-config'
  },
  globalIgnores(['test/fixtures'])
]);
