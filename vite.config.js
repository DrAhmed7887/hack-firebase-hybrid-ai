import { defineConfig } from 'vite';
export default defineConfig({ base: './', build: { target: 'esnext' }, test: { environment: 'node', include: ['tests/**/*.test.js'] } });
