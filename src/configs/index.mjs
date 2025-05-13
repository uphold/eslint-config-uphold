/**
 * ESM wrapper for configs.
 */

import { createJavaScriptConfig } from './javascript.js';
import { createTypeScriptConfig } from './typescript.js';

export const javascript = createJavaScriptConfig('module');
export const typescript = await createTypeScriptConfig('module');

export default {
  javascript,
  typescript
};
