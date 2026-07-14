/**
 * Module dependencies.
 */

import { createJavaScriptConfig } from '../../../src/configs/javascript.js';
import { describe, it } from 'node:test';
import globals from 'globals';

/**
 * Test suite for JavaScript config.
 */

describe('JavaScript config', () => {
  describe('createJavaScriptConfig()', () => {
    it('should return config with `commonjs` and `ecmaVersion` 2024 by default', (/** @type {import('node:test').TestContext} */ t) => {
      const config = createJavaScriptConfig();

      t.assert.snapshot(config[0]);

      // Find the main uphold config.
      const mainConfig = config.find(cfg => cfg.name?.includes('uphold/javascript-commonjs'));

      t.assert.snapshot(mainConfig);

      // Find config with `languageOptions`.
      const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

      t.assert.snapshot(configWithLangOptions);

      // Check that rules exist somewhere.
      const configWithRules = config.find(cfg => cfg.rules && Object.keys(cfg.rules).length > 0);

      t.assert.snapshot(configWithRules);
    });

    it('should return config with `commonjs` when explicitly specified', (/** @type {import('node:test').TestContext} */ t) => {
      const config = createJavaScriptConfig('commonjs');

      t.assert.snapshot(config[0]);

      const mainConfig = config.find(cfg => cfg.name?.includes('uphold/javascript-commonjs'));

      t.assert.snapshot(mainConfig);

      const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

      t.assert.snapshot(configWithLangOptions);

      t.assert.strictEqual(
        configWithLangOptions?.languageOptions?.globals,
        globals.node,
        'Should use `globals.node` for CommonJS'
      );
    });

    it('should return config with `module` type and `ecmaVersion` 2025', (/** @type {import('node:test').TestContext} */ t) => {
      const config = createJavaScriptConfig('module', { ecmaVersion: 2025 });

      t.assert.ok(Array.isArray(config), 'Should return an array');
      t.assert.ok(config.length > 0, 'Config array should not be empty');

      const mainConfig = config.find(cfg => cfg.name?.includes('uphold/javascript-module'));

      t.assert.ok(mainConfig, 'Should have `module` config');

      const configWithLangOptions = config.find(cfg => cfg.languageOptions?.globals);

      t.assert.ok(configWithLangOptions, 'Should have config with `languageOptions`');
      t.assert.strictEqual(
        // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
        configWithLangOptions.languageOptions.globals,
        globals.nodeBuiltin,
        'Should use `globals.nodeBuiltin` for module'
      );
      // @ts-expect-error configWithLangOptions could be undefined from `config.find`.
      t.assert.strictEqual(configWithLangOptions.languageOptions.ecmaVersion, 2025, 'Should use `ecmaVersion` 2025');
      t.assert.ok(
        // @ts-expect-error Incomplete typing for `parserOptions`.
        configWithLangOptions.languageOptions.parserOptions?.ecmaFeatures?.impliedStrict,
        'Should have `impliedStrict` enabled'
      );
    });

    it('should include all common configs', (/** @type {import('node:test').TestContext} */ t) => {
      const config = createJavaScriptConfig();

      // Main config + 13 common configs + 1 from extends flattening = 15.
      t.assert.strictEqual(config.length, 15, 'Should have 15 configs total after `defineConfig` flattening');
    });

    it('should have ESLint rules configured', (/** @type {import('node:test').TestContext} */ t) => {
      const config = createJavaScriptConfig();

      t.assert.snapshot(config[0]);
    });

    it('should have correct structure for all module types', (/** @type {import('node:test').TestContext} */ t) => {
      const commonjsConfig = createJavaScriptConfig('commonjs');
      const moduleConfig = createJavaScriptConfig('module');

      // Both should have same structure.
      t.assert.strictEqual(commonjsConfig.length, moduleConfig.length, 'Both should have same number of configs');

      const commonjsWithRules = commonjsConfig.find(cfg => cfg.rules && Object.keys(cfg.rules).length > 0);
      const moduleWithRules = moduleConfig.find(cfg => cfg.rules && Object.keys(cfg.rules).length > 0);

      t.assert.ok(commonjsWithRules, 'Commonjs config should have rules');
      t.assert.ok(moduleWithRules, 'Module config should have rules');
      // @ts-expect-error commonjsWithRules could be undefined from `commonjsConfig.find`.
      t.assert.ok(Object.keys(commonjsWithRules.rules).length > 0, 'Commonjs config should have rules defined');
      // @ts-expect-error moduleWithRules could be undefined from `moduleConfig.find`.
      t.assert.ok(Object.keys(moduleWithRules.rules).length > 0, 'Module config should have rules defined');
    });
  });
});
