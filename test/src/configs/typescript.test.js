/**
 * Module dependencies.
 */

import { createTypeScriptConfig } from '../../../src/configs/typescript.js';
import { describe, it } from 'node:test';
import globals from 'globals';

/**
 * Test suite for TypeScript config.
 */

describe('TypeScript config', () => {
  describe('createTypeScriptConfig()', () => {
    describe('with `typescript-eslint` available', () => {
      it('should return config with `typescript-eslint` for `module` by default', async (/** @type {import('node:test').TestContext} */ t) => {
        const mockTsEslint = {
          configs: {
            recommended: { rules: { '@typescript-eslint/no-unused-vars': 'error' } }
          },
          parser: {},
          plugin: {}
        };

        const config = await createTypeScriptConfig(
          'module',
          {},
          {
            isModuleAvailable: moduleName => ['typescript', 'typescript-eslint'].includes(moduleName),
            loadModule: moduleName => {
              if (moduleName === 'typescript-eslint') {
                return Promise.resolve(mockTsEslint);
              }

              return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
            }
          }
        );

        t.assert.snapshot(config[0]);

        const mainConfig = config.find(cfg => cfg.name?.includes('uphold/typescript-eslint-module'));

        t.assert.snapshot(mainConfig);

        const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

        t.assert.snapshot(configWithLangOptions);

        t.assert.ok(configWithLangOptions, 'Should have config with `languageOptions`');
        t.assert.strictEqual(
          // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
          configWithLangOptions.languageOptions.globals,
          globals.nodeBuiltin,
          'Should use `globals.nodeBuiltin` for `module`'
        );
        t.assert.strictEqual(
          // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
          configWithLangOptions.languageOptions.parser,
          mockTsEslint.parser,
          'Should use `typescript-eslint` parser'
        );
        t.assert.ok(configWithLangOptions.plugins, 'Should have plugins');
        t.assert.strictEqual(
          configWithLangOptions.plugins?.['@typescript-eslint'],
          mockTsEslint.plugin,
          'Should have `typescript-eslint` plugin'
        );

        const configWithRules = config.find(cfg => cfg.rules && Object.keys(cfg.rules).length > 0);

        t.assert.snapshot(configWithRules);

        // Find the config with TypeScript-specific rule overrides.
        const hasTypescriptRules = config.some(
          cfg => cfg.rules?.['no-unused-expressions'] || cfg.rules?.['no-unused-vars']
        );

        t.assert.ok(hasTypescriptRules, 'Should have TypeScript rule overrides');

        const configWithArrayType = config.find(cfg => cfg.rules?.['@typescript-eslint/array-type']);

        t.assert.ok(configWithArrayType, 'Should have `@typescript-eslint/array-type` rule');
        t.assert.deepStrictEqual(
          configWithArrayType.rules?.['@typescript-eslint/array-type'],
          ['error', { default: 'array-simple', readonly: 'array-simple' }],
          'Should use `array-simple` option'
        );
      });

      it('should return config with `typescript-eslint` for `commonjs` type', async (/** @type {import('node:test').TestContext} */ t) => {
        const mockTsEslint = {
          configs: {
            recommended: { rules: { '@typescript-eslint/no-unused-vars': 'error' } }
          },
          parser: {},
          plugin: {}
        };

        const config = await createTypeScriptConfig(
          'commonjs',
          {},
          {
            isModuleAvailable: moduleName => ['typescript', 'typescript-eslint'].includes(moduleName),
            loadModule: moduleName => {
              if (moduleName === 'typescript-eslint') {
                return Promise.resolve(mockTsEslint);
              }

              return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
            }
          }
        );

        t.assert.ok(Array.isArray(config), 'Should return an array');

        const mainConfig = config.find(cfg => cfg.name?.includes('uphold/typescript-eslint-commonjs'));

        t.assert.snapshot(mainConfig);
        t.assert.ok(mainConfig, 'Should have `typescript-eslint-commonjs` name');

        const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

        t.assert.strictEqual(
          configWithLangOptions?.languageOptions?.globals,
          globals.node,
          'Should use `globals.node` for CommonJS'
        );
      });

      it('should include all common configs when `typescript-eslint` available', async (/** @type {import('node:test').TestContext} */ t) => {
        const mockTsEslint = {
          configs: {
            recommended: { rules: { '@typescript-eslint/no-unused-vars': 'error' } }
          },
          parser: {},
          plugin: {}
        };

        const config = await createTypeScriptConfig(
          'commonjs',
          {},
          {
            isModuleAvailable: moduleName => ['typescript', 'typescript-eslint'].includes(moduleName),
            loadModule: moduleName => {
              if (moduleName === 'typescript-eslint') {
                return Promise.resolve(mockTsEslint);
              }

              return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
            }
          }
        );

        // Main config + 12 common configs + 2 from extends flattening = 15.
        t.assert.strictEqual(config.length, 15, 'Should have 15 configs total after `defineConfig` flattening');
      });
    });

    describe('without `typescript-eslint` (fallback mode)', () => {
      it('should return fallback config for `module` when `typescript` is not installed (no warning)', async (/** @type {import('node:test').TestContext} */ t) => {
        const warnMock = t.mock.method(process, 'emitWarning');

        const config = await createTypeScriptConfig('module', {}, { isModuleAvailable: () => false });

        t.assert.ok(Array.isArray(config), 'Should return an array');
        t.assert.ok(config.length > 0, 'Config array should not be empty');

        const mainConfig = config.find(cfg => cfg.name?.includes('uphold/typescript-compat-module'));

        t.assert.ok(mainConfig, 'Should have fallback module name');

        const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

        t.assert.ok(configWithLangOptions, 'Should have config with `languageOptions`');
        t.assert.strictEqual(
          // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
          configWithLangOptions.languageOptions.globals,
          globals.nodeBuiltin,
          'Should use `globals.nodeBuiltin` for `module`'
        );
        // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
        t.assert.ok(!configWithLangOptions.languageOptions.parser, 'Should not have `typescript-eslint` parser');
        t.assert.ok(
          !configWithLangOptions.plugins || !configWithLangOptions.plugins['@typescript-eslint'],
          'Should not have `typescript-eslint` plugin'
        );
        t.assert.strictEqual(warnMock.mock.callCount(), 0, 'Should not emit a warning when `typescript` is missing');
      });

      it('should warn and return fallback config when `typescript` is present but `typescript-eslint` is missing', async (/** @type {import('node:test').TestContext} */ t) => {
        const warnMock = t.mock.method(process, 'emitWarning');

        const config = await createTypeScriptConfig(
          'module',
          {},
          {
            isModuleAvailable: moduleName => moduleName === 'typescript'
          }
        );

        t.assert.ok(Array.isArray(config), 'Should return an array');
        t.assert.ok(config.length > 0, 'Config array should not be empty');

        const mainConfig = config.find(cfg => cfg.name?.includes('uphold/typescript-compat-module'));

        t.assert.ok(mainConfig, 'Should have fallback module name');

        t.assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have emitted a warning');
        t.assert.strictEqual(
          warnMock.mock.calls[0].arguments[0],
          '`typescript-eslint` not installed. Falling back to ESLint for TypeScript linting'
        );
        t.assert.deepStrictEqual(warnMock.mock.calls[0].arguments[1], {
          code: 'UPHOLD_ESLINT_TYPESCRIPT_ESLINT_MISSING',
          type: 'UpholdEslintWarning'
        });
      });

      it('should return fallback config for `commonjs` type when `typescript-eslint` not available', async (/** @type {import('node:test').TestContext} */ t) => {
        const warnMock = t.mock.method(process, 'emitWarning');

        const config = await createTypeScriptConfig(
          'commonjs',
          {},
          {
            isModuleAvailable: moduleName => moduleName === 'typescript'
          }
        );

        t.assert.snapshot(config[0]);

        const mainConfig = config.find(cfg => cfg.name?.includes('uphold/typescript-compat-commonjs'));

        t.assert.snapshot(mainConfig);

        t.assert.ok(mainConfig, 'Should have fallback commonjs name');

        const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

        t.assert.snapshot(configWithLangOptions);

        t.assert.strictEqual(
          configWithLangOptions?.languageOptions?.globals,
          globals.node,
          'Should use `globals.node` for CommonJS'
        );
        t.assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have emitted a warning');
        t.assert.strictEqual(
          warnMock.mock.calls[0].arguments[0],
          '`typescript-eslint` not installed. Falling back to ESLint for TypeScript linting'
        );
        t.assert.deepStrictEqual(warnMock.mock.calls[0].arguments[1], {
          code: 'UPHOLD_ESLINT_TYPESCRIPT_ESLINT_MISSING',
          type: 'UpholdEslintWarning'
        });
      });

      it('should include all common configs in fallback mode', async (/** @type {import('node:test').TestContext} */ t) => {
        const config = await createTypeScriptConfig('module', {}, { isModuleAvailable: () => false });

        t.assert.snapshot(config[0]);
      });
    });
  });
});
