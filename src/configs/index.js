/**
 * Module dependencies.
 */

import { createJavaScriptConfig } from './javascript.js';
import { createTypeScriptConfig } from './typescript.js';
import { defineConfig } from 'eslint/config';
import jestConfig from './jest.js';
import mochaConfig from './mocha.js';
import vitestConfig from './vitest.js';

/**
 * Export the Configurations.
 */

export const javascript = createJavaScriptConfig('commonjs');
export const jest = defineConfig(jestConfig);
export const mocha = defineConfig(mochaConfig);
export const typescript = await createTypeScriptConfig('module');
export const vitest = defineConfig(vitestConfig);

/**
 * Export configuration factories.
 */

export { createJavaScriptConfig, createTypeScriptConfig };

/**
 * Default export.
 */

export default { createJavaScriptConfig, createTypeScriptConfig, javascript, jest, mocha, typescript, vitest };
