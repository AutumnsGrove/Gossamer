import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Gossamer',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
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
