import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
  server: {
    host: '0.0.0.0', // Allow access from outside
    port: 3002, // Run on port 3002
  },
  preview: {
    host: '0.0.0.0',
    port: 3002, // Also make sure preview mode runs on 3002
  },
});
