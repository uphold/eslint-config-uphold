/**
 * Module dependencies.
 */

import { createJavaScriptConfig } from '../../../src/configs/javascript.js';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import globals from 'globals';

/**
 * Test suite for JavaScript config.
 */

describe('JavaScript config', () => {
  describe('createJavaScriptConfig()', () => {
    it('should return config with `commonjs` and `ecmaVersion` 2022 by default', () => {
      const config = createJavaScriptConfig();

      assert.ok(Array.isArray(config), 'Should return an array');
      assert.ok(config.length > 0, 'Config array should not be empty');

      // Find the main uphold config.
      const mainConfig = config.find(cfg => cfg.name?.includes('uphold/javascript-commonjs'));

      assert.ok(mainConfig, 'Should have CommonJS config');

      // Find config with `languageOptions`.
      const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

      assert.ok(configWithLangOptions, 'Should have config with `languageOptions`');
      assert.strictEqual(
        // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
        configWithLangOptions.languageOptions.globals,
        globals.node,
        'Should use `globals.node` for CommonJS'
      );
      assert.strictEqual(
        // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
        configWithLangOptions.languageOptions.ecmaVersion,
        2022,
        'Should use 2022 `ecmaVersion` by default'
      );
      assert.ok(
        // @ts-expect-error Incomplete typing for `parserOptions`.
        configWithLangOptions.languageOptions.parserOptions?.ecmaFeatures?.impliedStrict,
        'Should have `impliedStrict` enabled'
      );

      // Check that rules exist somewhere.
      const configWithRules = config.find(cfg => cfg.rules && Object.keys(cfg.rules).length > 0);

      assert.ok(configWithRules, 'Should have rules');
    });

    it('should return config with `commonjs` when explicitly specified', () => {
      const config = createJavaScriptConfig('commonjs');

      assert.ok(Array.isArray(config), 'Should return an array');

      const mainConfig = config.find(cfg => cfg.name?.includes('uphold/javascript-commonjs'));

      assert.ok(mainConfig, 'Should have CommonJS config');

      const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

      assert.strictEqual(
        configWithLangOptions?.languageOptions?.globals,
        globals.node,
        'Should use `globals.node` for CommonJS'
      );
    });

    it('should return config with `module` type and `ecmaVersion` 2024', () => {
      const config = createJavaScriptConfig('module', { ecmaVersion: 2024 });

      assert.ok(Array.isArray(config), 'Should return an array');
      assert.ok(config.length > 0, 'Config array should not be empty');

      const mainConfig = config.find(cfg => cfg.name?.includes('uphold/javascript-module'));

      assert.ok(mainConfig, 'Should have `module` config');

      const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

      assert.ok(configWithLangOptions, 'Should have config with `languageOptions`');
      assert.strictEqual(
        // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
        configWithLangOptions.languageOptions.globals,
        globals.nodeBuiltin,
        'Should use `globals.nodeBuiltin` for module'
      );
      // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
      assert.strictEqual(configWithLangOptions.languageOptions.ecmaVersion, 2024, 'Should use `ecmaVersion` 2024');
      assert.ok(
        // @ts-expect-error Incomplete typing for `parserOptions`.
        configWithLangOptions.languageOptions.parserOptions?.ecmaFeatures?.impliedStrict,
        'Should have `impliedStrict` enabled'
      );
    });

    it('should include all common configs', () => {
      const config = createJavaScriptConfig();

      // Main config + 11 common configs + 1 from extends flattening = 13.
      assert.strictEqual(config.length, 13, 'Should have 13 configs total after `defineConfig` flattening');
    });

    it('should have ESLint rules configured', () => {
      const config = createJavaScriptConfig();

      // First config should have the main config with rules.
      assert.ok(config[0].rules, 'Should have rules');
      assert.ok(Object.keys(config[0].rules).length > 0, 'Should have some rules defined');
    });

    it('should have correct structure for all module types', () => {
      const commonjsConfig = createJavaScriptConfig('commonjs');
      const moduleConfig = createJavaScriptConfig('module');

      // Both should have same structure.
      assert.strictEqual(commonjsConfig.length, moduleConfig.length, 'Both should have same number of configs');

      const commonjsWithRules = commonjsConfig.find(cfg => cfg.rules && Object.keys(cfg.rules).length > 0);
      const moduleWithRules = moduleConfig.find(cfg => cfg.rules && Object.keys(cfg.rules).length > 0);

      assert.ok(commonjsWithRules, 'Commonjs config should have rules');
      assert.ok(moduleWithRules, 'Module config should have rules');
      // @ts-expect-error commonjsWithRules could be undefined from `commonjsConfig.find`.
      assert.ok(Object.keys(commonjsWithRules.rules).length > 0, 'Commonjs config should have rules defined');
      // @ts-expect-error moduleWithRules could be undefined from `moduleConfig.find`.
      assert.ok(Object.keys(moduleWithRules.rules).length > 0, 'Module config should have rules defined');
    });
  });
});
