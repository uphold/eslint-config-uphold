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
    it('should return config with commonjs by default', () => {
      const config = createJavaScriptConfig();

      assert.ok(Array.isArray(config), 'Should return an array');
      assert.ok(config.length > 0, 'Config array should not be empty');

      // Find the main uphold config.
      const mainConfig = config.find(cfg => cfg.name?.startsWith('uphold/javascript-cjs'));

      assert.ok(mainConfig, 'Should have commonjs config');

      // Find config with `languageOptions`.
      const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

      assert.ok(configWithLangOptions, 'Should have config with languageOptions');
      assert.strictEqual(
        configWithLangOptions.languageOptions.globals,
        globals.node,
        'Should use globals.node for commonjs'
      );
      assert.strictEqual(configWithLangOptions.languageOptions.ecmaVersion, 'latest', 'Should use latest ecmaVersion');
      assert.ok(
        // @ts-expect-error Incomplete typing for `parserOptions`.
        configWithLangOptions.languageOptions.parserOptions?.ecmaFeatures?.impliedStrict,
        'Should have impliedStrict enabled'
      );

      // Check that rules exist somewhere.
      const configWithRules = config.find(cfg => cfg.rules && Object.keys(cfg.rules).length > 0);

      assert.ok(configWithRules, 'Should have rules');
    });

    it('should return config with commonjs when explicitly specified', () => {
      const config = createJavaScriptConfig('commonjs');

      assert.ok(Array.isArray(config), 'Should return an array');

      const mainConfig = config.find(cfg => cfg.name?.startsWith('uphold/javascript-cjs'));

      assert.ok(mainConfig, 'Should have commonjs config');

      const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

      assert.strictEqual(
        configWithLangOptions?.languageOptions?.globals,
        globals.node,
        'Should use globals.node for commonjs'
      );
    });

    it('should return config with module type', () => {
      const config = createJavaScriptConfig('module');

      assert.ok(Array.isArray(config), 'Should return an array');
      assert.ok(config.length > 0, 'Config array should not be empty');

      const mainConfig = config.find(cfg => cfg.name?.startsWith('uphold/javascript-mjs'));

      assert.ok(mainConfig, 'Should have module config');

      const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

      assert.ok(configWithLangOptions, 'Should have config with languageOptions');
      assert.strictEqual(
        configWithLangOptions.languageOptions.globals,
        globals.nodeBuiltin,
        'Should use globals.nodeBuiltin for module'
      );
      assert.strictEqual(configWithLangOptions.languageOptions.ecmaVersion, 'latest', 'Should use latest ecmaVersion');
      assert.ok(
        // @ts-expect-error Incomplete typing for `parserOptions`.
        configWithLangOptions.languageOptions.parserOptions?.ecmaFeatures?.impliedStrict,
        'Should have impliedStrict enabled'
      );
    });

    it('should include all common configs', () => {
      const config = createJavaScriptConfig();

      // Main config + 10 common configs + 2 from extends flattening.
      assert.strictEqual(config.length, 13, 'Should have 13 configs total after defineConfig flattening');
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
      assert.ok(Object.keys(commonjsWithRules.rules).length > 0, 'Commonjs config should have rules defined');
      assert.ok(Object.keys(moduleWithRules.rules).length > 0, 'Module config should have rules defined');
    });
  });
});
