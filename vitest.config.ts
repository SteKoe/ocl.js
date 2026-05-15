import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'lib/components'),
        },
    },
    test: {
        globals: true,
        include: ['test/**/*.spec.ts'],
        coverage: {
            provider: 'v8',
            include: ['lib/**'],
            exclude: ['**/I[A-Z][a-z]*.ts', '**/index.ts'],
            reporter: ['html'],
            all: true,
        },
        environment: 'node',
    },
});
