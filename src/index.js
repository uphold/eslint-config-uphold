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
  plugins: ['mocha', 'sort-imports-es6', 'sql-template'],
  root: true,
  rules: {
    'accessor-pairs': 'error',
    'block-scoped-var': 'error',
    'block-spacing': 'off',
    camelcase: 'off',
    complexity: 'off',
    'consistent-return': 'off',
    'consistent-this': ['error', 'self'],
    curly: 'error',
    'default-case': 'error',
    'dot-notation': 'error',
    eqeqeq: ['error', 'smart'],
    'func-names': 'off',
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: true
      }
    ],
    'id-length': [
      'error',
      {
        exceptions: ['_', 'e', 'i']
      }
    ],
    'id-match': [
      'error',
      '^_$|^[$_a-zA-Z]*[_a-zA-Z0-9]*[a-zA-Z0-9]*$|^[A-Z][_A-Z0-9]+[A-Z0-9]$',
      {
        onlyDeclarations: true,
        properties: true
      }
    ],
    'lines-around-comment': 'off',
    'max-depth': 'error',
    'max-nested-callbacks': 'off',
    'max-params': ['error', 4],
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-identical-title': 'error',
    'mocha/no-nested-tests': 'error',
    'mocha/no-sibling-hooks': 'error',
    'new-cap': 'error',
    'newline-before-return': 'error',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-catch-shadow': 'off',
    'no-cond-assign': ['error', 'always'],
    'no-div-regex': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty': 'error',
    'no-empty-label': 'off',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-implied-eval': 'error',
    'no-inline-comments': 'error',
    'no-iterator': 'error',
    'no-label-var': 'off',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-mixed-requires': 'error',
    'no-multi-str': 'error',
    'no-native-reassign': 'error',
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
    'no-shadow': 'off',
    'no-shadow-restricted-names': 'error',
    'no-sync': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'off',
    'no-underscore-dangle': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-use-before-define': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-warning-comments': 'off',
    'no-with': 'error',
    'object-shorthand': 'error',
    'operator-assignment': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] }
    ],
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
        printWidth: 120,
        singleQuote: true
      }
    ],
    radix: 'error',
    'require-atomic-updates': 'off',
    'require-await': 'error',
    'require-yield': 'error',
    'sort-imports-es6/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'sort-keys': [
      'error',
      'asc',
      {
        natural: true
      }
    ],
    'spaced-comment': 'error',
    'sql-template/no-unsafe-query': 'error',
    strict: 'off',
    'valid-jsdoc': 'error',
    'vars-on-top': 'error',
    yoda: 'error'
  }
};
