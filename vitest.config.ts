import { defineConfig } from 'vitest/config';

export default defineConfig({
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
