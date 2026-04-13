import { test as base } from 'playwright-bdd';
import { Page, APIRequestContext, request as playwrightRequest } from '@playwright/test';
import { Login } from '../pages/login.page';

const TOKEN_URL =
  'https://login.staging.treso2.com/realms/treso2-clients-testing/protocol/openid-connect/token';
const API_BASE_URL = 'https://api.staging.treso2.com';

type CustomFixtures = {
  authenticatedPage: Page;
  apiContext: APIRequestContext;
};

export const test = base.extend<CustomFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new Login(page);

    await loginPage.goto();

    await loginPage.login(
      process.env.TEST_USERNAME || 'nadhmi.benmed@gmail.com',
      process.env.TEST_PASSWORD || 'Nadh22328248)',
    );

    await page.waitForURL(/invoice-hub/);

    await use(page);
  },

  apiContext: async ({}, use) => {
    const authCtx = await playwrightRequest.newContext();
    const tokenRes = await authCtx.post(TOKEN_URL, {
      form: {
        grant_type: 'password',
        client_id: 'treso2-api',
        username: process.env.API_USERNAME || '',
        password: process.env.API_PASSWORD || '',
      },
    });

    if (!tokenRes.ok()) {
      const body = await tokenRes.text();
      throw new Error(
        `Token request failed — status: ${tokenRes.status()}\nURL: ${TOKEN_URL}\nBody: ${body}`,
      );
    }

    const tokenBody = await tokenRes.json();
    await authCtx.dispose();

    if (!tokenBody.access_token) {
      throw new Error(
        `Token response did not contain access_token. Response keys: ${Object.keys(tokenBody).join(', ')}`,
      );
    }

    const context = await playwrightRequest.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${tokenBody.access_token}`,
      },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect } from '@playwright/test';
