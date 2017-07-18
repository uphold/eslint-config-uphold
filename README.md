# eslint-config-uphold

Uphold-flavored ESLint config.

## Installation

```sh
$ npm install eslint eslint-config-uphold --save-dev
```

## Usage

Create an `.eslintrc.yml` file with the following:

```yaml
extends: uphold
```

Add the following `script` to your `package.json`:

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
