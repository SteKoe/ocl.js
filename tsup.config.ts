import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['lib/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
});
