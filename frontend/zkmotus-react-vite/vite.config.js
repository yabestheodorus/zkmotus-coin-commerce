import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),

  nodePolyfills({
    // Whether to polyfill specific globals.
    globals: {
      Buffer: true,
      global: true,
      process: true,
    },
    // Whether to polyfill `node:` protocol imports.
    protocolImports: true,
  }),

  ],
  optimizeDeps: {
    exclude: ['@aztec/bb.js'],
  },
  resolve: {
    alias: {
      pino: 'pino/browser.js',
    },
  },
})
