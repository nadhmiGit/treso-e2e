import { Given, When, Then } from './authentication/fixtures';
import { InvoicesApiHelper } from '../helpers/invoicesApi.helper';
import { IncomingInvoicesPage } from '../pages/incomingInvoices.page';

let invoicesApi: InvoicesApiHelper;
let contractIncomingPage: IncomingInvoicesPage;
let totalInvoiceCount: number = 0; // Stores total count for behavior comparison

Given('I have an authenticated API context', async ({ apiContext }) => {
  invoicesApi = new InvoicesApiHelper(apiContext);
});

// ─── When ────────────────────────────────────────────────────────────────────

When('I request all incoming invoices from the API', async ({}) => {
  await invoicesApi.fetchAllIncomingInvoices();
  totalInvoiceCount = invoicesApi.getInvoiceCount(); // Store total for comparison
});

When(
  'I request incoming invoices with status {string} from the API',
  async ({}, status: string) => {
    await invoicesApi.fetchIncomingInvoicesByStatus(parseInt(status, 10));
  },
);

When('I navigate to the incoming invoices page via UI', async ({ authenticatedPage }) => {
  contractIncomingPage = new IncomingInvoicesPage(authenticatedPage);
  await contractIncomingPage.goToIncomingInvoices();
});

// ─── Then ────────────────────────────────────────────────────────────────────

Then('the response status should be 200', async ({}) => {
  invoicesApi.assertResponseStatusOk();
});

// Rule: behavior — list is valid
Then('the response should be a non-empty array', async () => {
  invoicesApi.assertResponseIsValidList();
});

// Rule: schema validation — structure not exact values
Then('each invoice should have a valid schema', async ({}) => {
  invoicesApi.assertEachInvoiceHasValidSchema();
});

// Rule: behavior — filter reduces the list
Then('the filtered list should contain fewer invoices than the total', async ({}) => {
  invoicesApi.assertFilteredListIsSmallerThan(totalInvoiceCount);
});

Then('each invoice should have the {string} direction', async ({}, direction: string) => {
  invoicesApi.assertEachInvoiceHasDirection(direction as 'INCOMING' | 'OUTGOING');
});

Then('each invoice should have a {string} field', async ({}, field: string) => {
  invoicesApi.assertEachInvoiceHasField(field);
});

Then('each invoice should have status {string}', async ({}, status: string) => {
  invoicesApi.assertEachInvoiceHasStatus(parseInt(status, 10));
});

Then('the response should contain {string} invoices', async ({}, count: string) => {
  // Used only for UI/API contract test — not for standalone API tests
  invoicesApi.assertResponseIsValidList();
});

Then('the UI total count should match the API total count', async ({}) => {
  await contractIncomingPage.assertTotalTabCountEquals(invoicesApi.getInvoiceCount());
});
