/**
 * Module dependencies.
 */

import jsdocPlugin from 'eslint-plugin-jsdoc';
import nodePlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import rules from '../rules/index.js';
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';
import sortImportsRequiresPlugin from 'eslint-plugin-sort-imports-requires';
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix';
import sqlTemplatePlugin from 'eslint-plugin-sql-template';
import stylisticPlugin from '@stylistic/eslint-plugin-js';

export const eslintRules = {
  'accessor-pairs': 'error',
  'array-callback-return': 'error',
  'block-scoped-var': 'error',
  'consistent-this': ['error', 'self'],
  curly: 'error',
  'default-case': 'error',
  'dot-notation': 'error',
  eqeqeq: ['error', 'smart'],
  'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
  'id-length': ['error', { exceptions: ['_', 'e', 'i'] }],
  'id-match': [
    'error',
    '^_$|^[$_a-zA-Z]*[_a-zA-Z0-9]*[a-zA-Z0-9]*$|^[A-Z][_A-Z0-9]+[A-Z0-9]$',
    {
      onlyDeclarations: true,
      properties: true
    }
  ],
  'max-depth': 'error',
  'max-params': ['error', 4],
  'new-cap': 'error',
  'no-alert': 'error',
  'no-array-constructor': 'error',
  'no-bitwise': 'error',
  'no-caller': 'error',
  'no-cond-assign': ['error', 'always'],
  'no-console': 'warn',
  'no-div-regex': 'error',
  'no-duplicate-imports': 'error',
  'no-else-return': 'error',
  'no-eq-null': 'error',
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-implied-eval': 'error',
  'no-inline-comments': 'error',
  'no-irregular-whitespace': ['error', { skipComments: false, skipStrings: false, skipTemplates: false }],
  'no-iterator': 'error',
  'no-labels': 'error',
  'no-lone-blocks': 'error',
  'no-lonely-if': 'error',
  'no-loop-func': 'error',
  'no-multi-str': 'error',
  'no-nested-ternary': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-wrappers': 'error',
  'no-object-constructor': 'error',
  'no-octal-escape': 'error',
  'no-proto': 'error',
  'no-return-assign': 'error',
  'no-script-url': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-throw-literal': 'error',
  'no-undef-init': 'error',
  'no-underscore-dangle': 'error',
  'no-unneeded-ternary': 'error',
  'no-unused-expressions': 'error',
  'no-unused-vars': ['error', { caughtErrors: 'none' }],
  'no-use-before-define': 'error',
  'no-useless-call': 'error',
  'no-useless-concat': 'error',
  'no-var': 'error',
  'no-void': 'error',
  'object-shorthand': 'error',
  'operator-assignment': 'error',
  'prefer-const': 'error',
  'prefer-destructuring': [
    'error',
    {
      AssignmentExpression: {
        array: false,
        object: false
      },

      VariableDeclarator: {
        array: true,
        object: true
      }
    },
    {
      enforceForRenamedProperties: false
    }
  ],
  'prefer-spread': 'error',
  'prefer-template': 'error',
  'prettier/prettier': [
    'error',
    {
      arrowParens: 'avoid',
      printWidth: 120,
      singleQuote: true,
      trailingComma: 'none'
    }
  ],
  radix: 'error',
  'require-atomic-updates': 'off',
  'require-await': 'error',
  'vars-on-top': 'error',
  yoda: 'error'
};

export const jsdocConfig = {
  name: 'uphold/jsdoc',
  plugins: {
    jsdocPlugin
  },
  rules: {
    // ...jsdocPlugin.configs['flat/recommended-error'].rules,
    'jsdoc/no-defaults': 0,
    'jsdoc/require-description-complete-sentence': [
      'error',
      {
        abbreviations: ['e.g.', 'i.e.', 'etc.']
      }
    ],
    'jsdoc/require-jsdoc': 0,
    'jsdoc/tag-lines': 0
  }
};

export const nodePluginConfig = {
  name: 'uphold/nodePlugin',
  plugins: {
    'node-plugin': nodePlugin
  },
  rules: {
    'node-plugin/no-mixed-requires': 'error',
    'node-plugin/no-new-require': 'error',
    'node-plugin/no-path-concat': 'error',
    'node-plugin/no-process-env': 'error',
    'node-plugin/no-process-exit': 'error',
    'node-plugin/no-restricted-import': 'error',
    'node-plugin/no-restricted-require': 'error',
    'node-plugin/no-sync': 'error'
  }
};

export const promisePluginConfig = {
  name: 'uphold/promise',
  plugins: { promisePlugin },
  rules: {
    'promise/prefer-await-to-then': 'error'
  }
};

export const sortDestructureKeysConfig = {
  name: 'uphold/sortDestructureKeys',
  plugins: {
    'sort-destructure-keys': sortDestructureKeysPlugin
  },
  rules: {
    'sort-destructure-keys/sort-destructure-keys': 'error'
  }
};

export const sortImportsRequiresConfig = {
  name: 'uphold/sortImportsRequires',
  plugins: {
    'sort-imports-requires': sortImportsRequiresPlugin
  },
  rules: {
    'sort-imports-requires/sort-imports': ['error', { unsafeAutofix: true, useOldSingleMemberSyntax: true }],
    'sort-imports-requires/sort-requires': [
      'error',
      {
        unsafeAutofix: true,
        useAliases: false,
        useOldSingleMemberSyntax: true
      }
    ]
  }
};

export const sortKeysFixConfig = {
  name: 'uphold/sortKeysFix',
  plugins: {
    'sort-keys-fix': sortKeysFixPlugin
  },
  rules: {
    'sort-keys-fix/sort-keys-fix': ['error', 'asc', { natural: true }]
  }
};

export const sqlTemplateConfig = {
  name: 'uphold/sqlTemplate',
  plugins: {
    'sql-template': sqlTemplatePlugin
  },
  rules: {
    'sql-template/no-unsafe-query': 'error'
  }
};

export const stylisticConfig = {
  name: 'uphold/stylistic',
  plugins: {
    '@stylistic': stylisticPlugin
  },
  rules: {
    '@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
    '@stylistic/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: 'return',
        prev: '*'
      },
      {
        blankLine: 'always',
        next: '*',
        prev: ['const', 'let', 'var']
      },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var']
      }
    ],
    '@stylistic/spaced-comment': 'error'
  }
};

export const upholdPluginConfig = {
  name: 'uphold/upholdPlugin',
  plugins: {
    'uphold-plugin': { rules }
  },
  rules: {
    'uphold-plugin/explicit-sinon-use-fake-timers': 'error'
  }
};
