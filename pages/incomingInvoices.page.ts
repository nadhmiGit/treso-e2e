import { Locator, Page, expect } from '@playwright/test';

export class IncomingInvoicesPage {
  private readonly page: Page;
  readonly incomingInvoicesLink: Locator;
  readonly invoiceTable: Locator;
  readonly statusTabList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.incomingInvoicesLink = page.getByRole('link', { name: 'Factures entrantes' }).first();
    this.invoiceTable = page.getByRole('table');
    this.statusTabList = page.getByRole('tablist');
  }

  async goToIncomingInvoices() {
    await this.incomingInvoicesLink.click();
    await expect(this.page).toHaveURL(/incoming-invoices/);
  }

  async clickStatusTab(tabName: string) {
    await this.page.getByRole('tab', { name: new RegExp(tabName) }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async assertTabBadgeDisplays(tabName: string, expectedCount: string) {
    await expect(this.page.getByRole('tab', { name: new RegExp(tabName) })).toContainText(
      expectedCount,
    );
  }

  async assertTabIsSelected(tabName: string) {
    await expect(
      this.page.getByRole('tab', { name: new RegExp(tabName), selected: true }),
    ).toBeVisible();
  }

  async assertTableVisible() {
    await expect(this.invoiceTable).toBeVisible();
  }

  async assertStatusTabsVisible() {
    await expect(this.statusTabList).toBeVisible();
  }

  async assertInvoiceRowCount(expectedCount: number) {
    const dataRows = this.page.getByRole('rowgroup').last().getByRole('row');
    await expect(dataRows).toHaveCount(expectedCount);
  }

  async assertSupplierVisible(supplierName: string) {
    await expect(
      this.page.getByRole('cell', { name: new RegExp(supplierName) }).first(),
    ).toBeVisible();
  }

  async assertAmountVisible(amount: string) {
    await expect(this.page.getByRole('cell', { name: amount }).first()).toBeVisible();
  }

  async assertColumnHeaderVisible(headerName: string) {
    await expect(this.page.getByRole('columnheader', { name: headerName })).toBeVisible();
  }

  async assertTotalTabCountEquals(expectedCount: number) {
    // Target only the incoming invoices tablist, not the outgoing one
    const incomingTabList = this.page.getByRole('tablist').last();
    const totalTab = incomingTabList.getByRole('tab', { name: /Toutes/ });
    await expect(totalTab).toContainText(String(expectedCount));
  }

  async assertTabVisible(tabName: string) {
    await expect(this.page.getByRole('tab', { name: new RegExp(tabName) })).toBeVisible();
  }

  async assertButtonVisible(buttonName: string) {
    await expect(this.page.getByRole('button', { name: buttonName })).toBeVisible();
  }

  async assertUrlContains(segment: string) {
    await expect(this.page).toHaveURL(new RegExp(segment));
  }

  async openFirstInvoiceWithStatus(status: string) {
    await this.page.getByRole('row', { name: new RegExp(status) }).first().click();
    await this.page.getByRole('dialog').waitFor({ state: 'visible' });
  }

  async clickInvoiceDetailTab(tabName: string) {
    await this.page.getByRole('dialog').getByRole('tab', { name: new RegExp(tabName) }).click();
  }

  async assertCommentVisibleInPanel(commentText: string) {
    await expect(this.page.getByRole('dialog').getByText(commentText)).toBeVisible();
  }
}
