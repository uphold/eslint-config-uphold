import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    cache: false,
    globals: true,
    include: ['test/**/*.{test,spec}.js', 'test/index.js']
  }
});
