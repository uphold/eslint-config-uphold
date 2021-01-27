/**
 * Module dependencies.
 */

const rulesDir = require('eslint-plugin-rulesdir');

/**
 * Configure the rulesdir plugin.
 */

rulesDir.RULES_DIR = `${__dirname}/rules`;

/**
 * Export `uphold` shared configuration preset.
 */

module.exports = {
  env: {
    es6: true,
    jasmine: true,
    jest: true,
    mocha: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  plugins: ['mocha', 'rulesdir', 'sort-imports-es6', 'sql-template'],
  root: true,
  rules: {
    'accessor-pairs': 'error',
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
      { onlyDeclarations: true, properties: true }
    ],
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
    'no-div-regex': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-implied-eval': 'error',
    'no-inline-comments': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-mixed-requires': 'error',
    'no-multi-str': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-path-concat': 'error',
    'no-process-env': 'error',
    'no-process-exit': 'error',
    'no-proto': 'error',
    'no-restricted-modules': 'error',
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-sync': 'error',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-use-before-define': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'object-shorthand': 'error',
    'operator-assignment': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] }
    ],
    'prefer-const': 'error',
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: { array: false, object: false },
        VariableDeclarator: { array: true, object: true }
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'prettier/prettier': ['error', { arrowParens: 'avoid', printWidth: 120, singleQuote: true, trailingComma: 'none' }],
    radix: 'error',
    'require-atomic-updates': 'off',
    'require-await': 'error',
    'rulesdir/explicit-sinon-use-fake-timers': 'error',
    'sort-imports-es6/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'sort-keys': ['error', 'asc', { natural: true }],
    'spaced-comment': 'error',
    'sql-template/no-unsafe-query': 'error',
    'valid-jsdoc': 'error',
    'vars-on-top': 'error',
    yoda: 'error'
  }
};
