/**
 * Module dependencies.
 */

import { defineConfig } from 'eslint/config';
import { flatConfigs as importPlugin } from 'eslint-plugin-import';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import sortClassMembers from 'eslint-plugin-sort-class-members';
import uphold from './index.js';

/**
 * Uphold React config.
 */

export default defineConfig({
  extends: [
    uphold,
    reactPlugin.configs.flat.recommended,
    reactHooksPlugin.configs['recommended-latest'],
    importPlugin.recommended,
    sortClassMembers.configs['flat/recommended']
  ],
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
  rules: {
    'array-callback-return': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'import/default': 'error',
    'import/named': 'error',
    'import/no-cycle': 'warn',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'new-cap': ['error', { capIsNewExceptions: ['BigNumber'] }],
    'newline-after-var': 'off',
    'one-var': 'off',
    'prefer-object-spread': 'error',
    'promise/prefer-await-to-then': 'off',
    'react/boolean-prop-naming': ['warn', { rule: 'autoFocus|invalid|^(has|is|should|can)[A-Z]([A-Za-z0-9]?)+' }],
    'react/display-name': 'error',
    'react/hook-use-state': ['error', { allowDestructuredState: true }],
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': ['error', { props: 'never' }],
    'react/jsx-key': 'error',
    'react/jsx-newline': ['error', { prevent: false }],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-leaked-render': ['warn', { validStrategies: ['coerce', 'ternary'] }],
    'react/jsx-no-undef': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-sort-default-props': 'off',
    'react/jsx-sort-props': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-danger': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-string-refs': 'error',
    'react/no-unknown-property': 'error',
    'react/prefer-es6-class': 'error',
    'react/prefer-stateless-function': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-default-props': 'warn',
    'react/self-closing-comp': 'error',
    'react/sort-prop-types': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
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
    ],
    /* eslint-enable sort-keys-fix/sort-keys-fix */
    'stylistic/jsx-quotes': ['error', 'prefer-double']
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
});
