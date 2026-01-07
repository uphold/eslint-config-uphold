/**
 * Module dependencies.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';

/**
 * Test suite for Mocha config.
 */

describe('Mocha config', () => {
  it('should export a valid ESLint config object', async () => {
    const mochaConfig = await import('../../../src/configs/mocha.js');

    assert.ok(mochaConfig.default, 'Should have default export');
    assert.ok(mochaConfig.default.name, 'Config should have a name');
    assert.ok(typeof mochaConfig.default === 'object', 'Config should be an object');
  });

  it('should have correct name prefix', async () => {
    const mochaConfig = await import('../../../src/configs/mocha.js');

    assert.ok(mochaConfig.default.name, 'Config should have a name');
    assert.ok(
      mochaConfig.default.name.startsWith('uphold/mocha'),
      `Config name should start with 'uphold/mocha', got: ${mochaConfig.default.name}`
    );
  });

  it('should export empty config when Mocha is not installed', async () => {
    const mochaConfig = await import('../../../src/configs/mocha.js');
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

    const isMochaInstalled = isModuleAvailable('mocha');

    if (!isMochaInstalled) {
      assert.strictEqual(
        mochaConfig.default.name,
        'uphold/mocha-empty',
        'Should have empty config name when Mocha not installed'
      );
      assert.ok(!mochaConfig.default.extends, 'Empty config should not have extends');
      assert.ok(!mochaConfig.default.rules, 'Empty config should not have rules');
    }
  });

  it('should export globals config when Mocha is installed but plugin is not', async () => {
    const mochaConfig = await import('../../../src/configs/mocha.js');
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

    const isMochaInstalled = isModuleAvailable('mocha');
    const isPluginInstalled = isModuleAvailable('eslint-plugin-mocha');

    if (isMochaInstalled && !isPluginInstalled) {
      assert.strictEqual(
        mochaConfig.default.name,
        'uphold/mocha-globals',
        'Should have globals config name when plugin not installed'
      );
      assert.ok(mochaConfig.default.languageOptions, 'Should have languageOptions');
      assert.ok(mochaConfig.default.languageOptions.globals, 'Should have globals defined');
    }
  });

  it('should export full plugin config when both Mocha and plugin are installed', async () => {
    const mochaConfig = await import('../../../src/configs/mocha.js');
    const { isModuleAvailable } = await import('../../../src/utils/load-module.js');

    const isMochaInstalled = isModuleAvailable('mocha');
    const isPluginInstalled = isModuleAvailable('eslint-plugin-mocha');

    if (isMochaInstalled && isPluginInstalled) {
      assert.strictEqual(
        mochaConfig.default.name,
        'uphold/mocha-plugin-config',
        'Should have plugin config name when both installed'
      );
      assert.ok(mochaConfig.default.extends, 'Should have extends');
      assert.ok(Array.isArray(mochaConfig.default.extends), 'extends should be an array');
    }
  });
});
