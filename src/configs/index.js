/**
 * Module dependencies.
 */

import { defineConfig } from 'eslint/config';
import jestConfig from './jest.js';
import mochaConfig from './mocha.js';
import vitestConfig from './vitest.js';

/**
 * Export the Configurations.
 */

export const jest = defineConfig(jestConfig);
export const mocha = defineConfig(mochaConfig);
export const vitest = defineConfig(vitestConfig);

export default { jest, mocha, vitest };
