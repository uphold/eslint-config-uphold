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
    describe('with typescript-eslint available', () => {
      it('should return config with typescript-eslint for commonjs by default', async () => {
        const mockTsEslint = {
          configs: {
            recommended: { rules: { '@typescript-eslint/no-unused-vars': 'error' } }
          },
          parser: {},
          plugin: {}
        };

        const config = await createTypeScriptConfig('commonjs', {
          isModuleAvailable: moduleName => moduleName === 'typescript-eslint',
          loadModule: moduleName => {
            if (moduleName === 'typescript-eslint') {
              return Promise.resolve(mockTsEslint);
            }

            return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
          }
        });

        assert.ok(Array.isArray(config), 'Should return an array');
        assert.ok(config.length > 0, 'Config array should not be empty');

        const mainConfig = config.find(cfg => cfg.name?.startsWith('uphold/typescript-eslint-cjs'));

        assert.ok(mainConfig, 'Should have typescript-eslint cjs name');

        const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

        assert.ok(configWithLangOptions, 'Should have config with languageOptions');
        assert.strictEqual(
          configWithLangOptions.languageOptions.globals,
          globals.node,
          'Should use globals.node for commonjs'
        );
        assert.strictEqual(
          configWithLangOptions.languageOptions.parser,
          mockTsEslint.parser,
          'Should use typescript-eslint parser'
        );
        assert.ok(configWithLangOptions.plugins, 'Should have plugins');
        assert.strictEqual(
          configWithLangOptions.plugins?.['@typescript-eslint'],
          mockTsEslint.plugin,
          'Should have typescript-eslint plugin'
        );

        const configWithRules = config.find(cfg => cfg.rules && Object.keys(cfg.rules).length > 0);

        assert.ok(configWithRules, 'Should have rules');

        // Find the config with TypeScript-specific rule overrides.
        const hasTypescriptRules = config.some(
          cfg => cfg.rules?.['no-unused-expressions'] || cfg.rules?.['no-unused-vars']
        );

        assert.ok(hasTypescriptRules, 'Should have TypeScript rule overrides');
      });

      it('should return config with typescript-eslint for module type', async () => {
        const mockTsEslint = {
          configs: {
            recommended: { rules: { '@typescript-eslint/no-unused-vars': 'error' } }
          },
          parser: {},
          plugin: {}
        };

        const config = await createTypeScriptConfig('module', {
          isModuleAvailable: moduleName => moduleName === 'typescript-eslint',
          loadModule: moduleName => {
            if (moduleName === 'typescript-eslint') {
              return Promise.resolve(mockTsEslint);
            }

            return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
          }
        });

        assert.ok(Array.isArray(config), 'Should return an array');

        const mainConfig = config.find(cfg => cfg.name?.startsWith('uphold/typescript-eslint-mjs'));

        assert.ok(mainConfig, 'Should have typescript-eslint mjs name');

        const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

        assert.strictEqual(
          configWithLangOptions?.languageOptions?.globals,
          globals.nodeBuiltin,
          'Should use globals.nodeBuiltin for module'
        );
      });

      it('should include all common configs when typescript-eslint available', async () => {
        const mockTsEslint = {
          configs: {
            recommended: { rules: { '@typescript-eslint/no-unused-vars': 'error' } }
          },
          parser: {},
          plugin: {}
        };

        const config = await createTypeScriptConfig('commonjs', {
          isModuleAvailable: moduleName => moduleName === 'typescript-eslint',
          loadModule: moduleName => {
            if (moduleName === 'typescript-eslint') {
              return Promise.resolve(mockTsEslint);
            }

            return Promise.reject(new Error(`Unexpected module: ${moduleName}`));
          }
        });

        // Main config + 10 common configs.
        assert.ok(config.length >= 11, 'Should include all common configs');
      });
    });

    describe('without typescript-eslint (fallback mode)', () => {
      it('should return fallback config for commonjs when typescript-eslint not available', async context => {
        const warnMock = context.mock.method(console, 'warn');

        const config = await createTypeScriptConfig('commonjs', {
          isModuleAvailable: () => false
        });

        assert.ok(Array.isArray(config), 'Should return an array');
        assert.ok(config.length > 0, 'Config array should not be empty');
        assert.strictEqual(config[0].name, 'uphold/typescript-compat-cjs', 'Should have fallback cjs name');
        assert.ok(config[0].files, 'Should have files pattern');
        assert.ok(Array.isArray(config[0].files), 'files should be an array');
        assert.ok(
          config[0].files.includes('**/*.ts') && config[0].files.includes('**/*.tsx'),
          'Should include TypeScript file patterns'
        );
        assert.ok(config[0].languageOptions, 'Should have languageOptions');
        assert.strictEqual(config[0].languageOptions.globals, globals.node, 'Should use globals.node for commonjs');
        assert.ok(!config[0].languageOptions.parser, 'Should not have typescript-eslint parser');
        assert.ok(
          !config[0].plugins || !config[0].plugins['@typescript-eslint'],
          'Should not have typescript-eslint plugin'
        );

        // Verify warning was logged.
        assert.strictEqual(warnMock.mock.callCount(), 1, 'Should have logged a warning');
        assert.strictEqual(
          warnMock.mock.calls[0].arguments[0],
          '`typescript-eslint` not installed. Falling back to ESLint for TypeScript linting'
        );
      });

      it('should return fallback config for module type when typescript-eslint not available', async () => {
        const config = await createTypeScriptConfig('module', {
          isModuleAvailable: () => false
        });

        assert.ok(Array.isArray(config), 'Should return an array');
        assert.strictEqual(config[0].name, 'uphold/typescript-compat-mjs', 'Should have fallback mjs name');
        assert.strictEqual(
          config[0].languageOptions?.globals,
          globals.nodeBuiltin,
          'Should use globals.nodeBuiltin for module'
        );
      });

      it('should include all common configs in fallback mode', async () => {
        const config = await createTypeScriptConfig('commonjs', {
          isModuleAvailable: () => false
        });

        // Main config + 10 common configs.
        assert.ok(config.length >= 11, 'Should include all common configs in fallback mode');
      });
    });
  });
});
