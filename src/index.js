
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
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  plugins: ['mocha', 'sort-imports-es6', 'sql-template'],
  root: true,
  rules: {
    'accessor-pairs': 'error',
    'array-bracket-spacing': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'block-scoped-var': 'error',
    'block-spacing': 'off',
    'brace-style': ['error', '1tbs', {
      allowSingleLine: true
    }],
    camelcase: 'off',
    'comma-dangle': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    complexity: 'off',
    'computed-property-spacing': 'error',
    'consistent-return': 'off',
    'consistent-this': ['error', 'self'],
    curly: 'error',
    'default-case': 'error',
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    'eol-last': 'error',
    eqeqeq: ['error', 'smart'],
    'func-names': 'off',
    'func-style': ['error', 'declaration', {
      allowArrowFunctions: true
    }],
    'generator-star-spacing': ['error', 'before'],
    'id-length': ['error', {
      exceptions: ['_', 'e', 'i']
    }],
    'id-match': ['error', '^_$|^[$_a-zA-Z]*[_a-zA-Z0-9]*[a-zA-Z0-9]*$|^[A-Z][_A-Z0-9]+[A-Z0-9]$', {
      onlyDeclarations: true,
      properties: true
    }],
    indent: ['error', 2, {
      SwitchCase: 1
    }],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': 'error',
    'lines-around-comment': 'off',
    'max-depth': 'error',
    'max-nested-callbacks': 'off',
    'max-params': ['error', 4],
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-identical-title': 'error',
    'mocha/no-nested-tests': 'error',
    'mocha/no-sibling-hooks': 'error',
    'new-cap': 'error',
    'new-parens': 'error',
    'newline-before-return': 'error',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-catch-shadow': 'off',
    'no-cond-assign': ['error', 'always'],
    'no-confusing-arrow': 'error',
    'no-div-regex': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty': 'error',
    'no-empty-label': 'off',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-parens': 'error',
    'no-floating-decimal': 'error',
    'no-implied-eval': 'error',
    'no-inline-comments': 'error',
    'no-iterator': 'error',
    'no-label-var': 'off',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-mixed-requires': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': ['error', {
      max: 1
    }],
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
    'no-spaced-func': 'error',
    'no-sync': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'off',
    'no-underscore-dangle': 'error',
    'no-unexpected-multiline': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-use-before-define': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-warning-comments': 'off',
    'no-with': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'one-var-declaration-per-line': ['error', 'always'],
    'operator-assignment': 'error',
    'operator-linebreak': ['error', 'none'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': ['error',
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] }
    ],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': ['error', {
      AssignmentExpression: {
        array: false,
        object: false
      },
      VariableDeclarator: {
        array: true,
        object: true
      }
    }, {
      enforceForRenamedProperties: false
    }],
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single', {
      allowTemplateLiterals: true
    }],
    radix: 'error',
    'require-atomic-updates': 'off',
    'require-await': 'error',
    'require-yield': 'error',
    semi: 'error',
    'semi-spacing': 'error',
    'sort-imports-es6/sort-imports-es6': ['error', {
      ignoreCase: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
    }],
    'sort-keys': ['error', 'asc', {
      natural: true
    }],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', { anonymous: 'never', named: 'never' }],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'sql-template/no-unsafe-query': 'error',
    strict: 'off',
    'template-curly-spacing': 'error',
    'valid-jsdoc': 'error',
    'vars-on-top': 'error',
    'wrap-iife': ['error', 'inside'],
    yoda: 'error'
  }
};
