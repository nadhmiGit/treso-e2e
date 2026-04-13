import { Locator, Page, expect } from '@playwright/test';

export class OutgoingInvoicesPage {
  readonly dashboardLink: Locator;
  readonly outgoingInvoicesLink: Locator;
  readonly root: Locator;

  constructor(page: Page) {
    this.dashboardLink = page.getByRole('link', { name: 'Tableau de bord' });
    // this.outgoingInvoicesLink = page.getByRole('link', { name: 'Factures sortantes' });
    this.outgoingInvoicesLink = page.locator('[data-cy="invoiceHub-subItem-0"]');
    this.root = page.locator('#root');
  }

  async goToDashboard() {
    await this.dashboardLink.click();
  }

  async goToOutgoingInvoices() {
    await this.outgoingInvoicesLink.click();
  }

  async assertOnOutgoingInvoicesPage() {
    await expect(this.root).toContainText('Factures sortantes');
  }
}
