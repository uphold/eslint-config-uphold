/**
 * Module dependencies.
 */

import * as importX from 'eslint-plugin-import-x';
import { defineConfig } from '@eslint/config-helpers';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import sortClassMembers from 'eslint-plugin-sort-class-members';
import uphold from './../index.js';

/**
 * Uphold React config.
 */

const upholdReact = defineConfig([
  {
    extends: [uphold, reactPlugin.configs.flat.recommended, reactHooksPlugin.configs['recommended-latest']],
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ...reactPlugin.configs.flat.recommended.languageOptions,
        babelOptions: {
          presets: ['@babel/preset-react']
        },
        ecmaFeatures: {
          jsx: true
        },
        globals: {
          ...globals.serviceworker,
          ...globals.browser
        },
        requireConfigFile: false
      }
    },
    name: 'uphold-react/base',
    rules: {
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      'array-callback-return': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'new-cap': ['error', { capIsNewExceptions: ['BigNumber'] }],
      'newline-after-var': 'off',
      'one-var': 'off',
      'prefer-object-spread': 'error',
      'promise/prefer-await-to-then': 'off',
      'react/boolean-prop-naming': ['warn', { rule: 'autoFocus|invalid|^(has|is|should|can)[A-Z]([A-Za-z0-9]?)+' }],
      'react/hook-use-state': ['error', { allowDestructuredState: true }],
      'react/jsx-boolean-value': 'error',
      'react/jsx-curly-brace-presence': ['error', { props: 'never' }],
      'react/jsx-newline': ['error', { prevent: false }],
      'react/jsx-no-leaked-render': ['warn', { validStrategies: ['coerce', 'ternary'] }],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-sort-default-props': 'off',
      'react/jsx-sort-props': 'error',
      'react/no-danger': 'error',
      'react/prefer-es6-class': 'error',
      'react/prefer-stateless-function': 'error',
      'react/require-default-props': 'warn',
      'react/self-closing-comp': 'error',
      'react/sort-prop-types': 'error'
    },
    settings: {
      react: {
        pragma: 'React',
        version: 'detect'
      }
    }
  },
  {
    extends: [importX.flatConfigs.recommended],
    name: 'uphold-react/import-x',
    rules: {
      'import-x/no-cycle': 'warn',
      'import-x/no-duplicates': 'error',
      'import-x/no-useless-path-segments': ['error', { noUselessIndex: true }]
    }
  },
  {
    extends: [sortClassMembers.configs['flat/recommended']],
    name: 'uphold-react/sort-class-members',
    rules: {
      /* eslint-disable sort-keys-fix/sort-keys-fix */
      'sort-class-members/sort-class-members': [
        'error',
        {
          order: [
            '[static-properties-alpha]',
            '[static-methods-alpha]',
            '[properties-alpha]',
            '[constructor]',
            '[methods-alpha]'
          ],
          groups: {
            'static-properties-alpha': [{ type: 'property', static: true, sort: 'alphabetical' }],
            'static-methods-alpha': [{ type: 'method', static: true, sort: 'alphabetical' }],
            'properties-alpha': [{ type: 'property', propertyType: 'Literal', sort: 'alphabetical' }],
            'methods-alpha': [{ type: 'method', sort: 'alphabetical' }]
          }
        }
      ]
      /* eslint-enable sort-keys-fix/sort-keys-fix */
    }
  }
]);

/**
 * Export the configuration.
 *
 * @see https://nodejs.org/docs/latest-v22.x/api/modules.html#loading-ecmascript-modules-using-require
 */

export { upholdReact as 'module.exports' };
export default upholdReact;
