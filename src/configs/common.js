/**
 * Module dependencies.
 */

import { isModuleAvailable } from '../utils/load-module.js';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import nodePlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import rules from '../rules/index.js';
import sortDestructureKeysPlugin from 'eslint-plugin-sort-destructure-keys';
import sortImportsRequiresPlugin from 'eslint-plugin-sort-imports-requires';
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix';
import sqlTemplatePlugin from 'eslint-plugin-sql-template';
import stylisticPlugin from '@stylistic/eslint-plugin';

/**
 * Constants.
 */

const isSinonAvailable = isModuleAvailable('sinon');

/**
 * Default ECMAScript version for configs.
 * @type {import('eslint').Linter.LanguageOptions['ecmaVersion']}
 */
export const defaultEcmaVersion = 2022;

/**
 * ESLint base rules.
 * @type {import('eslint').Linter.RulesRecord}
 */
export const eslintRules = {
  'accessor-pairs': 'error',
  'array-callback-return': 'error',
  'block-scoped-var': 'error',
  'consistent-this': ['error', 'self'],
  curly: 'error',
  'default-case': 'error',
  'dot-notation': 'error',
  eqeqeq: ['error', 'smart'],
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
  'no-duplicate-imports': [
    'error',
    {
      includeExports: true
    }
  ],
  'no-else-return': 'error',
  'no-eq-null': 'error',
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-implied-eval': 'error',
  'no-inline-comments': 'error',
  'no-irregular-whitespace': [
    'error',
    {
      skipComments: false,
      skipStrings: false,
      skipTemplates: false
    }
  ],
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
  'no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      caughtErrors: 'none',
      varsIgnorePattern: '^_.+'
    }
  ],
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

/**
 * Common rules for `eslint-plugin-jsdoc`.
 * @type {import('eslint').Linter.RulesRecord}
 */
const jsdocPluginRules = {
  'jsdoc/no-defaults': 'off',
  'jsdoc/require-description-complete-sentence': [
    'error',
    {
      abbreviations: ['e.g.', 'i.e.', 'etc.']
    }
  ],
  'jsdoc/require-jsdoc': 'off',
  'jsdoc/tag-lines': 'off'
};

/**
 * Configuration for `eslint-plugin-jsdoc` for JavaScript.
 * @type {import('eslint').Linter.Config}
 */
export const jsdocPluginConfigJavaScript = {
  name: 'uphold/jsdoc-javascript',
  plugins: {
    jsdoc: jsdocPlugin
  },
  rules: {
    ...jsdocPlugin.configs['flat/recommended-error'].rules,
    ...jsdocPluginRules
  }
};

/**
 * Configuration for `eslint-plugin-jsdoc` for TypeScript.
 * @type {import('eslint').Linter.Config}
 */
export const jsdocPluginConfigTypeScript = {
  name: 'uphold/jsdoc-typescript',
  plugins: {
    jsdoc: jsdocPlugin
  },
  rules: {
    ...jsdocPlugin.configs['flat/recommended-typescript-error'].rules,
    ...jsdocPluginRules
  }
};

/**
 * Configuration for `eslint-plugin-n`.
 * @type {import('eslint').Linter.Config}
 */
export const nodePluginConfig = {
  name: 'uphold/plugin-n',
  plugins: {
    /* eslint-disable-next-line id-length */
    n: nodePlugin
  },
  rules: {
    'n/no-mixed-requires': 'error',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/no-process-env': 'error',
    'n/no-process-exit': 'error',
    'n/no-restricted-import': 'error',
    'n/no-restricted-require': 'error',
    'n/no-sync': 'error',
    'n/prefer-node-protocol': 'error'
  }
};

/**
 * Configuration for `eslint-plugin-promise`.
 * @type {import('eslint').Linter.Config}
 * @todo To consider adding the recommended ruleset, by extending `pluginPromis.configs['flat/recommended']`.
 */
export const promisePluginConfig = {
  name: 'uphold/promise',
  plugins: {
    // @ts-expect-error Outdated types for `eslint-plugin-promise`.
    promise: promisePlugin
  },
  rules: {
    'promise/prefer-await-to-then': 'error'
  }
};

/**
 * Configuration for `eslint-plugin-sort-destructure-keys`.
 * @type {import('eslint').Linter.Config}
 */
export const sortDestructureKeysConfig = {
  name: 'uphold/sort-destructure-keys',
  plugins: {
    // @ts-expect-error Outdated types for `eslint-plugin-sort-destructure-keys`.
    'sort-destructure-keys': sortDestructureKeysPlugin
  },
  rules: {
    'sort-destructure-keys/sort-destructure-keys': 'error'
  }
};

/**
 * Configuration for `eslint-plugin-sort-imports-requires`.
 * @type {import('eslint').Linter.Config}
 */
export const sortImportsRequiresConfig = {
  name: 'uphold/sort-imports-requires',
  plugins: {
    'sort-imports-requires': sortImportsRequiresPlugin
  },
  rules: {
    'sort-imports-requires/sort-imports': [
      'error',
      {
        unsafeAutofix: true,
        useOldSingleMemberSyntax: true
      }
    ],
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

/**
 * Configuration for `eslint-plugin-sort-keys-fix`.
 * @type {import('eslint').Linter.Config}
 */
export const sortKeysFixConfig = {
  name: 'uphold/sort-keys-fix',
  plugins: {
    'sort-keys-fix': sortKeysFixPlugin
  },
  rules: {
    'sort-keys-fix/sort-keys-fix': [
      'error',
      'asc',
      {
        natural: true
      }
    ]
  }
};

/**
 * Configuration for `eslint-plugin-sql-template`.
 * @type {import('eslint').Linter.Config}
 */
export const sqlTemplateConfig = {
  name: 'uphold/sql-template',
  plugins: {
    // @ts-expect-error Outdated types for `eslint-plugin-sql-template`.
    'sql-template': sqlTemplatePlugin
  },
  rules: {
    'sql-template/no-unsafe-query': 'error'
  }
};

/**
 * Configuration for `@stylistic/eslint-plugin`.
 * @type {import('eslint').Linter.Config}
 */
export const stylisticConfig = {
  name: 'uphold/stylistic',
  plugins: {
    '@stylistic': stylisticPlugin
  },
  rules: {
    '@stylistic/no-tabs': [
      'error',
      {
        allowIndentationTabs: true
      }
    ],
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
        prev: ['const', 'if', 'let', 'var']
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

/**
 * Configuration for `uphold-plugin`, our custom rules.
 * @type {import('eslint').Linter.Config}
 */
export const upholdPluginConfig = {
  name: 'uphold/uphold-plugin',
  plugins: {
    'uphold-plugin': { rules }
  },
  rules: {
    ...(isSinonAvailable && { 'uphold-plugin/explicit-sinon-use-fake-timers': 'error' }),
    'uphold-plugin/no-trailing-period-in-log-messages': 'error',
    'uphold-plugin/require-comment-punctuation': 'error'
  }
};

/**
 * Configuration for `scripts` and `bin` files.
 * @type {import('eslint').Linter.Config}
 */
export const upholdScriptsBinConfig = {
  files: ['**/bin/**', '**/scripts/**'],
  name: 'uphold/scripts-bin',
  rules: {
    'n/no-process-exit': 'off',
    'no-console': 'off'
  }
};
