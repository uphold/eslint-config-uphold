# eslint-config-uphold

Uphold-flavored [ESLint](https://eslint.org/) config.

The [rules defined here](https://github.com/uphold/eslint-config-uphold/blob/master/src/index.js)
extend the [eslint-recommended](https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js) preset,
as well as the [overrides](https://github.com/prettier/eslint-config-prettier/blob/master/index.js)
that allow the [Prettier](https://prettier.io) pretty-printer to reformat the code without conflicts.

## Installation

```sh
$ npm install eslint eslint-config-uphold prettier --save-dev
```

## Usage

Create an `.eslintrc.yml` file with the following content:

```yaml
extends: uphold
```

Add a `lint` command to the `scripts` section of your `package.json`, like so:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

and run the linter with:

```sh
$ npm run lint
```

To automatically fix all lint issues, use the `--fix` option:

```sh
$ npm run lint --fix
```
