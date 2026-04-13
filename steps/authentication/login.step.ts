import { expect } from '@playwright/test';
import { Login } from '../../pages/login.page';
import { Given, When, Then } from './fixtures';

let loginPage: Login;

Given('I navigate to the treso login page', async ({ page }) => {
  loginPage = new Login(page);
  await loginPage.goto();
});

// Credentials are loaded from .env 
When('I login with valid credentials', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.TEST_USERNAME || '');
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.TEST_PASSWORD || '');
  await page.getByRole('button', { name: 'Next' }).click();
});

Then('I should be redirected to the dashboard', async ({ page }) => {
  await expect(page).toHaveURL(/invoice-hub/);
  await expect(page.getByText(/bonjour/i)).toBeVisible();
});

Given('I am authenticated', async ({ authenticatedPage: _ }) => {
  // Authentication is handled by the authenticatedPage fixture
});
