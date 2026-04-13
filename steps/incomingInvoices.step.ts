import { Given, When, Then } from './authentication/fixtures';
import { IncomingInvoicesPage } from '../pages/incomingInvoices.page';

let incomingPage: IncomingInvoicesPage;

Given('I am on the incoming invoices page', async ({ authenticatedPage }) => {
  incomingPage = new IncomingInvoicesPage(authenticatedPage);
  await incomingPage.goToIncomingInvoices();
});

When('I click on the {string} status tab', async ({}, tabName: string) => {
  await incomingPage.clickStatusTab(tabName);
});

When('I view the status tabs', async ({}) => {
  await incomingPage.assertStatusTabsVisible();
});

When('I view the invoice table', async ({}) => {
  await incomingPage.assertTableVisible();
});

Then('the {string} tab badge should display {string}', async ({}, tabName: string, expectedCount: string) => {
  await incomingPage.assertTabBadgeDisplays(tabName, expectedCount);
});

Then('the {string} tab should be selected', async ({}, tabName: string) => {
  await incomingPage.assertTabIsSelected(tabName);
});

Then('the invoice table should be visible', async ({}) => {
  await incomingPage.assertTableVisible();
});

Then('the invoice list should contain {string} rows', async ({}, expectedCount: string) => {
  await incomingPage.assertInvoiceRowCount(parseInt(expectedCount, 10));
});

Then('the {string} tab should display count {string}', async ({}, tabName: string, expectedCount: string) => {
  await incomingPage.assertTabBadgeDisplays(tabName, expectedCount);
});

Then('I should see supplier {string} in the table', async ({}, supplierName: string) => {
  await incomingPage.assertSupplierVisible(supplierName);
});

Then('I should see amount {string} in the table', async ({}, amount: string) => {
  await incomingPage.assertAmountVisible(amount);
});

Then('the column header {string} should be visible', async ({}, headerName: string) => {
  await incomingPage.assertColumnHeaderVisible(headerName);
});

Then('the {string} tab should be visible', async ({}, tabName: string) => {
  await incomingPage.assertTabVisible(tabName);
});

Then('the {string} button should be visible', async ({}, buttonName: string) => {
  await incomingPage.assertButtonVisible(buttonName);
});

Then('the page URL should contain {string}', async ({}, segment: string) => {
  await incomingPage.assertUrlContains(segment);
});

When('I open the first invoice with status {string}', async ({}, status: string) => {
  await incomingPage.openFirstInvoiceWithStatus(status);
});

When('I click on the {string} tab in the invoice detail panel', async ({}, tabName: string) => {
  await incomingPage.clickInvoiceDetailTab(tabName);
});

Then('the comment {string} should be visible in the invoice panel', async ({}, commentText: string) => {
  await incomingPage.assertCommentVisibleInPanel(commentText);
});
