import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        // Enable Svelte 5 runes mode
        runes: true,
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GossamerSvelte',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: ['svelte', 'svelte/internal', '@autumnsgrove/gossamer'],
      output: {
        globals: {
          svelte: 'Svelte',
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
  resolve: {
    alias: {
      '@autumnsgrove/gossamer': resolve(__dirname, '../core/src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
});
