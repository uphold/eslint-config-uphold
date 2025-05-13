# eslint-config-uphold

Uphold-flavored [ESLint](https://eslint.org/) config.

The [rules defined here](https://github.com/uphold/eslint-config-uphold/blob/master/src/index.js)
extend the [eslint-recommended](https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js) preset,
as well as the [overrides](https://github.com/prettier/eslint-config-prettier/blob/master/index.js)
that allow the [Prettier](https://prettier.io) pretty-printer to reformat the code without conflicts.

## Status

[![npm version][npm-image]][npm-url]

## Installation

```sh
npm install eslint eslint-config-uphold prettier --save-dev
```

> [!WARNING]
> Node.js minimum versions are `v23.0.0`, `v22.12.0` and `v20.19.0`, as `@stylistic/eslint-plugin-js` depends on the `require('esm')` module from `v4.0.0`.

## Usage

Create an `eslint.config.mjs` file with the following content:

```js
import upholdConfig from 'eslint-config-uphold';

export default upholdConfig;
```

If you'd like to extend the config, or change rules, you can do so like this:

```js
import { defineConfig } from 'eslint/config';
import upholdConfig from 'eslint-config-uphold';
import yourPlugin from 'your-eslint-plugin';

export default defineConfig([
  upholdConfig,
  {
    name: 'project-name/config',
    plugins: {
      'your-plugin': yourPlugin
    },
    rules: {
      'your-plugin/rule-name': 'error'
    }
  }
]);
```

See [Using a Shareable Config](https://eslint.org/docs/latest/extend/shareable-configs#using-a-shareable-config) for more information.

Add a `lint` command to the `scripts` section of your `package.json`, like so:

```json
{
  "scripts": {
    "lint": "eslint"
  }
}
```

and run the linter with:

```sh
npm run lint
```

To automatically fix all lint issues, use the `--fix` option:

```sh
npm run lint --fix
```

### TypeScript

A TypeScript-specific config using `typescript-eslint` is available under `eslint-config-uphold/configs/`.

It can be used like this, on a `eslint.config.mjs` file:

```js
import { defineConfig, globalIgnores } from 'eslint/config';
import { typescript as upholdTypescriptConfig } from 'eslint-config-uphold/configs';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    extends: [upholdTypescriptConfig],
    name: 'project-name/uphold-typescript',
    rules: {
      'jsdoc/no-types': 'warn'
    }
  },
  globalIgnores(['coverage', 'dist'])
]);
```

It's also possible to use the config without `typescript-eslint`. Minimal setup would look like the following:

```js
import { typescript as upholdTypescriptConfig } from 'eslint-config-uphold/configs';

export default upholdTypescriptConfig;
```

The TypeScript config assumes ESM by default.
If your project uses CJS, you can create a custom config using the `createTypeScriptConfig` factory.
This can also be used to specify a `ecmaVersion` other than the default `2022`.

```js
import { createTypeScriptConfig } from 'eslint-config-uphold/configs';

export default await createTypeScriptConfig('commonjs', { ecmaVersion: 2024 }); // 'module' for ESM, 'commonjs' for CJS.
```

### JavaScript

Likewise, a JavaScript-specific config is exported under `eslint-config-uphold/configs/`. The usage is similar to TypeScript's config:

```js
import { defineConfig, globalIgnores } from 'eslint/config';
import { javascript as upholdJavascriptConfig } from 'eslint-config-uphold/configs';

export default defineConfig([upholdJavascriptConfig, globalIgnores(['coverage'])]);
```

If not wanting to extend the config, it could even be used like the following:

```js
import { javascript as upholdJavascriptConfig } from 'eslint-config-uphold/configs';

export default upholdJavascriptConfig;
```

The JavaScript config assumes CJS by default.
If your project uses ESM, you can create a custom config using the `createJavaScriptConfig` factory.
This can also be used to specify a `ecmaVersion` other than the default `2022`.

```js
import { createJavaScriptConfig } from 'eslint-config-uphold/configs';

export default createJavaScriptConfig('module', { ecmaVersion: 2024 }); // 'module' for ESM, 'commonjs' for CJS.
```

### Custom rules

This config includes custom Uphold-specific rules, under `uphold-plugin`.

| Rule                                                                        | Enabled in default config? | Fix?  |
| --------------------------------------------------------------------------- | -------------------------- | ----- |
| [`database-migration-filename-format`](#database-migration-filename-format) | False                      | False |
| [`explicit-sinon-use-fake-timers`](#explicit-sinon-use-fake-timers)         | True                       | False |
| [`no-trailing-period-in-log-messages`](#no-trailing-period-in-log-messages) | True                       | True  |

#### `database-migration-filename-format`

Validates that migration file names are in the format `YYYYMMDDHHMMSS-<name>`, where `name` must match the regex `[a-z0-9-]+`, the date/time is UTC and is not in the future.

To enable the `database-migration-filename-format` rule, you can do so as following:

```js
export default defineConfig([
  ...
  {
    files: ['**/database/migrations/*.js'] // glob to include/exclude the migration files to lint
    name: 'project/migrations',
    rules: {
      'uphold-plugin/database-migration-filename-format': 'error'
    }
  },
  ...
]);
```

#### `explicit-sinon-use-fake-timers`

Enforces explicit configuration when using Sinon's `useFakeTimers()` by requiring the `toFake` option to be specified. This ensures that only the intended timer functions are faked, reducing the risk of unintended side effects in tests.

**Valid:**

```js
sinon.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
```

**Invalid:**

```js
sinon.useFakeTimers(); // ❌ Missing 'toFake' option.
```

#### `no-trailing-period-in-log-messages`

Disallows trailing periods in log messages, except for `...` (ellipsis). This helps maintain consistency across log messages.

**Valid:**

```js
console.log('Operation complete');
console.info('Processing...');
logger.error('An error occurred');
```

**Invalid:**

```js
console.log('Operation complete.'); // ❌ Remove the trailing period.
console.info('Processing..'); // ❌ Use three dots (...) or none.
logger.error('An error occurred.'); // ❌ Remove the trailing period.
```

**Options:**

- `additionalMethods` - You can configure additional methods to check:

  ```js
  'uphold-plugin/no-trailing-period-in-log-messages': ['error', {
    additionalMethods: ['fatal', 'verbose', 'success']
  }]
  ```

### Test configs

This package includes individual exported configs for multiple test frameworks:

- [Jest](https://jestjs.io/), depending on `eslint-plugin-jest`.
- [Mocha](https://mochajs.org/), depending on `eslint-plugin-mocha`.
- [Vitest](https://vitest.dev/), depending on `@vitest/eslint-plugin` and `typescript`.

To use them, import the config directly in your `eslint.config.mjs` file:

```js
import { defineConfig } from 'eslint/config';
import { mocha as upholdMochaConfig } from 'eslint-config-uphold/configs';
import upholdConfig from 'eslint-config-uphold';

export default defineConfig([
  upholdConfig,
  {
    extends: [upholdMochaConfig],
    files: ['test/**/*.js'],
    name: 'project-name/tests',
    rules: {
      'mocha/no-identical-title': 'off'
    }
  }
]);
```

Those can be imported from `eslint-config-uphold/configs`:

```js
import { jest, mocha, vitest } from 'eslint-config-uphold/configs';
```

> [!NOTE]
> Test configs use top-level `await` for dynamic module detection and are **ESM-only**. If your project uses CommonJS, your `eslint.config.mjs` still supports `import()` and top-level `await`.

## Upgrading ESLint

See the [ESLint repo](https://github.com/eslint/eslint#semantic-versioning-policy) for ESLint's guidelines on semantic versioning.

A [tilde range](https://docs.npmjs.com/cli/v6/using-npm/semver#tilde-ranges-123-12-1) is set for the ESLint dependency to pick up any patch changes by default.

For any minor/major upgrades to ESLint it is recommended to update both `eslint` and `eslint-config-uphold` and keep them in parallel.
This is down to the fact that no guarantee is made that minor upgrades do not cause conflicts or issues with existing or new rules.
The downside here is a package update is required for any security or other bug fixes.
The benefit however is the included rules are always guaranteed to be stable.

## Release process

The release of a version is automated via the [release](https://github.com/uphold/eslint-config-uphold/.github/workflows/release.yml) GitHub workflow.
Run it by clicking the "Run workflow" button.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/eslint-config-uphold.svg
[npm-url]: https://www.npmjs.com/package/eslint-config-uphold
