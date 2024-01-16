import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ include: ['lib'] })],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'vite-plugin-bundle-prefetch',
      // the proper extensions will be added
      fileName: 'vite-plugin-bundle-prefetch',
    },
  },
});
