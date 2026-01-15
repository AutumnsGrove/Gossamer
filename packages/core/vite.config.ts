import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        runes: true,
      },
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'svelte/index': resolve(__dirname, 'src/svelte/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['svelte', 'svelte/internal', 'svelte/store'],
      output: {
        preserveModules: false,
      },
    },
    sourcemap: true,
    minify: false,
  },
  test: {
    globals: true,
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
  },
});
