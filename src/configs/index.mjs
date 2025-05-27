/**
 * Module dependencies.
 */

import { createJavaScriptConfig } from './javascript.js';
import { createTypeScriptConfig } from './typescript.js';
import jest from './jest.js';
import mocha from './mocha.js';
import vitest from './vitest.js';

/**
 * ESM wrapper for configs.
 */

export const javascript = createJavaScriptConfig('module');
export const typescript = await createTypeScriptConfig('module');

export default {
  javascript,
  jest,
  mocha,
  typescript,
  vitest
};
