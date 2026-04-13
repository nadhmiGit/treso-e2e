import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/** * Login Page Object for Treso
 * Represents the login page on Treso and encapsulates all login-related interactions
 */

export class Login extends BasePage {
  // Locators
  readonly emailInput: Locator;
  readonly nextButton: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    super(page, '/invoice-hub');

    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
  }

  /**
   * Perform login with credentials
   */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.nextButton.click();

    await this.passwordInput.fill(password);
    await this.nextButton.click();
  }
}
