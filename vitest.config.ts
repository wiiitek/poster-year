import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Enable test globals (describe, it, expect, etc.)
    globals: true,
    // Test environment (jsdom for DOM APIs, node for Node.js)
    environment: 'jsdom',
    // Include pattern for test files
    include: ['src/**/*.test.ts'],
    // Exclude directories
    exclude: ['node_modules', 'dist', 'playwright-report', 'test-results'],
    // Coverage configuration
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*'],
      exclude: ['src/**/*.test.ts']
    }
  },
  // Resolve TypeScript paths and modules
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  }
})
