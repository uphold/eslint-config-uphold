/**
 * Module dependencies.
 *
 * @typedef {import('eslint').Linter.Config} LinterConfig
 */

const babelParser = require('@babel/eslint-parser');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');
const js = require('@eslint/js');
const jsdoc = require('eslint-plugin-jsdoc');
const mocha = require('eslint-plugin-mocha');
const nodePlugin = require('eslint-plugin-n');
const path = require('node:path');
const promise = require('eslint-plugin-promise');
const rulesDir = require('eslint-plugin-rulesdir');
const sortDestructureKeys = require('eslint-plugin-sort-destructure-keys');
const sortImportsRequires = require('eslint-plugin-sort-imports-requires');
const sortKeysFix = require('eslint-plugin-sort-keys-fix');
const sqlTemplate = require('eslint-plugin-sql-template');
const stylistic = require('@stylistic/eslint-plugin-js');

/**
 * Configure the `rulesDir` plugin.
 */

rulesDir.RULES_DIR = path.join(__dirname, 'rules');

/**
 * Language options.
 *
 * @type {LinterConfig['languageOptions']}
 */
const languageOptions = {
  ecmaVersion: 2020,
  globals: {
    ...globals.jasmine,
    ...globals.jest,
    ...globals.mocha,
    ...globals.node
  },
  parser: babelParser,
  parserOptions: {
    requireConfigFile: false
  }
};

/**
 * Base configuration for Uphold.
 *
 * @type {LinterConfig}
 */
const upholdBaseConfig = {
  languageOptions,
  plugins: {
    jsdoc,
    mocha,
    'node-plugin': nodePlugin,
    promise,
    rulesdir: rulesDir,
    'sort-destructure-keys': sortDestructureKeys,
    'sort-imports-requires': sortImportsRequires,
    'sort-keys-fix': sortKeysFix,
    'sql-template': sqlTemplate,
    stylistic
  },
  rules: {
    ...js.configs.recommended.rules,
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
    'jsdoc/no-defaults': 0,
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-jsdoc': 0,
    'jsdoc/tag-lines': 0,
    'max-depth': 'error',
    'max-params': ['error', 4],
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-identical-title': 'error',
    'mocha/no-nested-tests': 'error',
    'mocha/no-sibling-hooks': 'error',
    'new-cap': 'error',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-console': 'warn',
    'no-div-regex': 'error',
    'no-dupe-keys': 'error',
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
    'node-plugin/no-mixed-requires': 'error',
    'node-plugin/no-new-require': 'error',
    'node-plugin/no-path-concat': 'error',
    'node-plugin/no-process-env': 'error',
    'node-plugin/no-process-exit': 'error',
    'node-plugin/no-restricted-import': 'error',
    'node-plugin/no-restricted-require': 'error',
    'node-plugin/no-sync': 'error',
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
    'promise/prefer-await-to-then': 'error',
    radix: 'error',
    'require-atomic-updates': 'off',
    'require-await': 'error',
    'rulesdir/explicit-sinon-use-fake-timers': 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-imports-requires/sort-imports': ['error', { unsafeAutofix: true, useOldSingleMemberSyntax: true }],
    'sort-imports-requires/sort-requires': [
      'error',
      { unsafeAutofix: true, useAliases: false, useOldSingleMemberSyntax: true }
    ],
    'sort-keys-fix/sort-keys-fix': ['error', 'asc', { natural: true }],
    'sql-template/no-unsafe-query': 'error',
    'stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
    'stylistic/padding-line-between-statements': [
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
    'stylistic/spaced-comment': 'error',
    'vars-on-top': 'error',
    yoda: 'error'
  }
};

/**
 * Configuration for bin and scripts files.
 *
 * @type {LinterConfig}
 */
const upholdBinScriptsConfig = {
  files: ['**/bin/**', '**/scripts/**'],
  languageOptions,
  rules: {
    'no-console': 'off',
    'node-plugin/no-process-exit': 'off'
  }
};

/**
 * Export `uphold` shared configuration preset.
 *
 * @type {LinterConfig[]}
 */
module.exports = [
  jsdoc.configs['flat/recommended-error'],
  eslintPluginPrettierRecommended,
  upholdBaseConfig,
  upholdBinScriptsConfig
];
