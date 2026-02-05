# Migration guides

This file contains migration guides for major versions of `eslint-config-uphold`.

## v6 to v7

### ESLint v9 to v10 migration

ESLint v10 introduces some breaking changes. See the [ESLint v9 to v10 migration guide](https://eslint.org/docs/latest/use/migrating-to-v10) for more details.
To deal with plugins that haven't been updated to support ESLint v9 nor v10, it may be possible to use `@eslint/compat`'s helper functions.

## Dropped support for Node.js v20

Node.js >= v22.12.0 is required, as it uses `require('esm')` to support ESM from certain plugins, dropping support for Node.js v20, which has reached its end-of-life.

### `eslint-plugin-n` renaming

The plugin `eslint-plugin-n` got renamed from `node-plugin` to `n` to align with the official naming.

Update references to it in your ESLint configuration and any disabled rules' comments in your codebase.

### Parser changes

`@babel/eslint-parser` has been removed and is no longer included by default, resorting to ESLint's default parser instead.

If you rely on Babel-specific syntax, install `@babel/eslint-parser` and configure it as your parser in your ESLint configuration.

See [ESLint > Configure a Parser](https://eslint.org/docs/latest/use/configure/parser) and the [@babel/eslint-parser documentation](https://www.npmjs.com/package/@babel/eslint-parser) for more details on how to set it up.

### Test Environment globals

Env globals from `jasmine`, `jest`, and `mocha` are no longer included on the base config, as those should be specific to test files.

If needing to use them, specify them in your ESLint configuration under `languageOptions.globals` on a config targeting your test files.

- See [ESLint > Language Options > Specifying Globals](https://eslint.org/docs/latest/use/configure/language-options#specifying-globals)
- [Example in the README on how to use test framework configs](README.md#test-configs), which include the relevant globals.

### Test plugins

`eslint-plugin-mocha` moved from dependencies to `peerDependencies`, as it's not very useful for projects using other frameworks.
There are test framework configs available for `jest`, `mocha`, and `vitest` individually. See [Test configs](README.md#test-configs).
Ensure you have it installed in your project if you use the Mocha test framework, while also importing the Mocha config from `eslint-config-uphold`.

### ESM

The package is now ESM-only. Your ESLint configuration must use ESM syntax (e.g. `eslint.config.mjs` on a CommonJS project).

### Unified imports, removing `eslint-config-uphold/configs`

The `eslint-config-uphold/configs` entry point is removed.
All configs are now exported directly from `eslint-config-uphold`.

Instead of:

```js
import { defineConfig } from 'eslint/config';
import { jest as jestConfig } from 'eslint-config-uphold/configs';
import upholdConfig from 'eslint-config-uphold';
```

Use:

```js
import { defineConfig } from 'eslint/config';
import { javascript as upholdJavascriptConfig, jest as upholdJestConfig } from 'eslint-config-uphold';
```

### Language configs no longer include `files`

The `javascript` and `typescript` configs no longer include a `files` property. You must specify which files each config applies to, unless you want them to apply to all files:

```js
import { defineConfig } from 'eslint/config';
import { javascript as upholdJavascriptConfig } from 'eslint-config-uphold';

export default defineConfig([
  {
    extends: [upholdJavascriptConfig],
    files: ['**/*.js', '**/*.jsx'] // You must specify this.
  }
]);
```

This gives you full control over file targeting and avoids conflicts with file extensions that have fixed module types (`.cjs`/`.mjs` for JavaScript, `.cts`/`.mts` for TypeScript), while also allowing for more flexibility in mixed codebases and if using ESLint for other languages, such as `@eslint/json` or `@eslint/markdown`.

### `explicit-sinon-use-fake-timers` behavioral difference

The default export always enables `uphold-plugin/explicit-sinon-use-fake-timers` as `'error'`, while the individual `javascript` and `typescript` named exports only enable it conditionally when `sinon` is detected as an installed dependency.

If you are switching from the default export to the `javascript` or `typescript` named exports and your project uses `sinon`, ensure `sinon` is listed in your `package.json` so the rule is automatically enabled. Alternatively, you can enable it manually:

```js
import { defineConfig } from 'eslint/config';
import { javascript as upholdJavascriptConfig } from 'eslint-config-uphold';

export default defineConfig([
  {
    extends: [upholdJavascriptConfig],
    files: ['**/*.js'],
    rules: {
      'uphold-plugin/explicit-sinon-use-fake-timers': 'error'
    }
  }
]);
```

## v5 to v6

### Dropped support for Node.js v20.18.0 and below

`eslint-config-uphold` now requires Node.js v20.19.0, v22.12.0, v23, or above, to use `require('esm')`.

### ESLint v8 to v9 migration

#### (ESLint config file format)

ESLint now uses a flat config format by default, instead of the previous `.eslintrc` format.
See [ESLint > Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files#flat-configuration-files) for more details.

- Create an `eslint.config.mjs` file in your project root.
- Use ESM syntax to import `eslint-config-uphold` and export the config using `defineConfig()` from `eslint/config`. Example:

  ```js
  import { defineConfig } from 'eslint/config';
  import upholdConfig from 'eslint-config-uphold';

  export default defineConfig([
    upholdConfig,
    {
      // Your custom config here.
    }
  ]);
  ```

- Bring any customizations from your previous config into the new format. Any ignore patterns from `.eslintignore` files will need to be moved to the `globalIgnores` property of your new config. See [ESLint > Configuration Files > globally ignore files](https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores) for more details. Example:

  ```js
  export default defineConfig([
    upholdConfig,
    {
      // Your custom config here.
    },
    globalIgnores(['ignore1', 'ignore2/**'])
  ]);
  ```

#### Rule deprecations

- Some rules have been deprecated in ESLint v9. Use the ESLint config inspector to identify any deprecated rules in your config:

  ```sh
  eslint --inspect-config
  ```

  1. Select the **Rules** tab.
  2. Select **Usage "Using"**.
  3. Select **State "Deprecated"**.
  4. Review the list of deprecated rules and update your config accordingly.

Docs for ESLint Config Inspector <https://github.com/eslint/config-inspector>

### Prettier upgrade from v2 to v3

Ensure Prettier is upgraded to v3 in your project, unless you are not using Prettier at all.
