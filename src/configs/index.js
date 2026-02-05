/**
 * Module dependencies.
 */

import { createJavaScriptConfig } from './javascript.js';
import { createJestConfig } from './jest.js';
import { createMochaConfig } from './mocha.js';
import { createTypeScriptConfig } from './typescript.js';
import { createVitestConfig } from './vitest.js';

/**
 * Export the Configurations.
 */

export const javascript = createJavaScriptConfig('commonjs');
export const jest = await createJestConfig();
export const mocha = await createMochaConfig();
export const typescript = await createTypeScriptConfig('module');
export const vitest = await createVitestConfig();

/**
 * Export configuration factories.
 */

export { createJavaScriptConfig, createTypeScriptConfig };
