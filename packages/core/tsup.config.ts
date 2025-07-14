import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./index.ts'],
  format: ['esm', 'cjs'],
  outDir: './dist',
  shims: true,
  clean: true,
  dts: true,
});
