/**
 * Module dependencies.
 */

import { createTypeScriptConfig } from '../../../src/configs/typescript.js';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import globals from 'globals';

/**
 * Test suite for TypeScript config.
 */

describe('TypeScript config', () => {
  describe('createTypeScriptConfig()', () => {
    describe('with `typescript-eslint` available', () => {
      it('should return config with `typescript-eslint` for `module` by default', async () => {
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
            isModuleAvailable: moduleName => moduleName === 'typescript-eslint',
            loadModule: moduleName => {
              if (moduleName === 'typescript-eslint') {
                return Promise.resolve(mockTsEslint);
              }

              return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
            }
          }
        );

        assert.ok(Array.isArray(config), 'Should return an array');
        assert.ok(config.length > 0, 'Config array should not be empty');

        const mainConfig = config.find(cfg => cfg.name?.includes('uphold/typescript-eslint-module'));

        assert.ok(mainConfig, 'Should have `typescript-eslint-module` name');

        const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

        assert.ok(configWithLangOptions, 'Should have config with `languageOptions`');
        assert.strictEqual(
          // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
          configWithLangOptions.languageOptions.globals,
          globals.nodeBuiltin,
          'Should use `globals.nodeBuiltin` for `module`'
        );
        assert.strictEqual(
          // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
          configWithLangOptions.languageOptions.parser,
          mockTsEslint.parser,
          'Should use `typescript-eslint` parser'
        );
        assert.ok(configWithLangOptions.plugins, 'Should have plugins');
        assert.strictEqual(
          configWithLangOptions.plugins?.['@typescript-eslint'],
          mockTsEslint.plugin,
          'Should have `typescript-eslint` plugin'
        );

        const configWithRules = config.find(cfg => cfg.rules && Object.keys(cfg.rules).length > 0);

        assert.ok(configWithRules, 'Should have rules');

        // Find the config with TypeScript-specific rule overrides.
        const hasTypescriptRules = config.some(
          cfg => cfg.rules?.['no-unused-expressions'] || cfg.rules?.['no-unused-vars']
        );

        assert.ok(hasTypescriptRules, 'Should have TypeScript rule overrides');
      });

      it('should return config with `typescript-eslint` for `commonjs` type', async () => {
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
            isModuleAvailable: moduleName => moduleName === 'typescript-eslint',
            loadModule: moduleName => {
              if (moduleName === 'typescript-eslint') {
                return Promise.resolve(mockTsEslint);
              }

              return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
            }
          }
        );

        assert.ok(Array.isArray(config), 'Should return an array');

        const mainConfig = config.find(cfg => cfg.name?.includes('uphold/typescript-eslint-commonjs'));

        assert.ok(mainConfig, 'Should have `typescript-eslint-commonjs` name');

        const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

        assert.strictEqual(
          configWithLangOptions?.languageOptions?.globals,
          globals.node,
          'Should use `globals.node` for CommonJS'
        );
      });

      it('should include all common configs when `typescript-eslint` available', async () => {
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
            isModuleAvailable: moduleName => moduleName === 'typescript-eslint',
            loadModule: moduleName => {
              if (moduleName === 'typescript-eslint') {
                return Promise.resolve(mockTsEslint);
              }

              return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
            }
          }
        );

        // Main config + 11 common configs + 2 from extends flattening = 14.
        assert.strictEqual(config.length, 14, 'Should have 14 configs total after `defineConfig` flattening');
      });
    });

    describe('without `typescript-eslint` (fallback mode)', () => {
      it('should return fallback config for `module` when `typescript-eslint` not available', async context => {
        const warnMock = context.mock.method(console, 'warn');

        const config = await createTypeScriptConfig('module', {}, { isModuleAvailable: () => false });

        assert.ok(Array.isArray(config), 'Should return an array');
        assert.ok(config.length > 0, 'Config array should not be empty');

        const mainConfig = config.find(cfg => cfg.name?.includes('uphold/typescript-compat-module'));

        assert.ok(mainConfig, 'Should have fallback module name');

        const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

        assert.ok(configWithLangOptions, 'Should have config with `languageOptions`');
        assert.ok(configWithLangOptions.files, 'Should have files pattern');
        assert.ok(Array.isArray(configWithLangOptions.files), 'files should be an array');
        assert.ok(
          configWithLangOptions.files.includes('**/*.ts') && configWithLangOptions.files.includes('**/*.tsx'),
          'Should include TypeScript file patterns'
        );
        assert.strictEqual(
          // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
          configWithLangOptions.languageOptions.globals,
          globals.nodeBuiltin,
          'Should use `globals.nodeBuiltin` for `module`'
        );
        // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
        assert.ok(!configWithLangOptions.languageOptions.parser, 'Should not have `typescript-eslint` parser');
        assert.ok(
          !configWithLangOptions.plugins || !configWithLangOptions.plugins['@typescript-eslint'],
          'Should not have `typescript-eslint` plugin'
        );
        assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have logged a warning');
        assert.strictEqual(
          warnMock.mock.calls[0].arguments[0],
          '`typescript-eslint` not installed. Falling back to ESLint for TypeScript linting'
        );
      });

      it('should return fallback config for `commonjs` type when `typescript-eslint` not available', async () => {
        const config = await createTypeScriptConfig('commonjs', {}, { isModuleAvailable: () => false });

        assert.ok(Array.isArray(config), 'Should return an array');

        const mainConfig = config.find(cfg => cfg.name?.includes('uphold/typescript-compat-commonjs'));

        assert.ok(mainConfig, 'Should have fallback commonjs name');

        const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

        assert.strictEqual(
          configWithLangOptions?.languageOptions?.globals,
          globals.node,
          'Should use `globals.node` for CommonJS'
        );
      });

      it('should include all common configs in fallback mode', async () => {
        const config = await createTypeScriptConfig('module', {}, { isModuleAvailable: () => false });

        // Main config + 11 common configs + 1 from extends flattening = 13.
        assert.strictEqual(config.length, 13, 'Should have 13 configs total after `defineConfig` flattening');
      });
    });
  });
});
