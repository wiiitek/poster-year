import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 6,
  outputDir: 'test-results/playwright',
  reporter: [
    ['junit', { outputFile: 'test-results/playwright/playwright-junit.xml' }],
    ['html', { open: 'never', outputFolder: 'test-results/playwright-html' }],
  ],
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: {
      mode: 'on',
      fullPage: true
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  webServer: {
    command: 'npm run build && npx http-server dist -p 8080',
    port: 8080,
    reuseExistingServer: !process.env.CI,
  },
})
