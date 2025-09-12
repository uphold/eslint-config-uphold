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

Create an `eslint.config.js` file with the following content:

```js
const uphold = require('eslint-config-uphold');

module.exports = uphold;
```

If you'd like to extend the config, or change rules, you can do so like this:

```js
const { defineConfig } = require('eslint/config');
const uphold = require('eslint-config-uphold');
const yourPlugin = require('your-eslint-plugin');

module.exports = defineConfig([
  {
    extends: [uphold],
    name: 'uphold-config',
    plugins: {
      'your-plugin': yourPlugin,
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

### React config

A React config is available under `eslint-config-uphold/configs/react`.
It can be used like the following example in ESM, on `eslint.config.mjs`:

```js
import { defineConfig } from 'eslint/config';
import upholdReact from 'eslint-config-uphold/configs/react';

export default defineConfig([
  {
    extends: [upholdReact],
    name: 'uphold-config-react',
    plugins: {
      'your-plugin': yourPlugin
    },
    rules: {
      'your-plugin/rule-name': 'error'
    }
  }
]);
```

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
