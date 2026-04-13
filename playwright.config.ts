import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { cucumberReporter, defineBddConfig } from 'playwright-bdd';

const targetEnv = dotenv.config();
dotenvExpand.expand(targetEnv);

const testDir = defineBddConfig({
  paths: ['./features/**/*.feature'],
  require: [
    './steps/**/*.step.ts',
    './steps/authentication/fixtures.ts',
    './fixtures/custom-fixtures.ts',
  ],
});

export default defineConfig({
  timeout: 120 * 1000,

  testDir,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  retries: process.env.RETRIES ? Number(process.env.RETRIES) : process.env.CI ? 0 : 0,

  workers: process.env.WORKERS ? Number(process.env.WORKERS) : process.env.CI ? 3 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    cucumberReporter('json', {
      outputFile: 'cucumber-report/report.json',
      skipAttachments: true,
    }),
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],

  expect: {
    timeout: 5 * 1000,
  },

  use: {
    baseURL: process.env.BASE_URL || 'https://app.hub.staging.treso2.com',

    headless: process.env.HEADLESS === 'true',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 20 * 1000,
    navigationTimeout: 30 * 1000,

    testIdAttribute: 'data-testid',
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'api',
      grep: /@api/,
    },
    {
      name: 'chromium',
      grepInvert: /@api/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      grepInvert: /@api/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      grepInvert: /@api/,
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
