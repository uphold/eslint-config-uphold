/**
 * Module dependencies.
 */

import { defineConfig, globalIgnores } from 'eslint/config';
import uphold from './src/index.js';
import upholdReact from './src/react.js';

/**
 * `ESLint` configuration.
 */

export default defineConfig([
  {
    extends: [uphold],
    files: ['src/**.js', 'test/index.js', 'eslint.config.js', '.release-it.js'],
    name: 'uphold-config'
  },
  {
    extends: [upholdReact],
    files: ['test/react.test.js'],
    name: 'uphold-react-config'
  },
  globalIgnores(['test/fixtures'])
]);
