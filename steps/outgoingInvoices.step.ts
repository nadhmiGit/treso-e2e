import { When, Then } from './authentication/fixtures';
import { OutgoingInvoicesPage } from '../pages/outgoingInvoices.page';

let outgoingPage: OutgoingInvoicesPage;

When('I navigate to {string}', async ({ authenticatedPage }) => {
  outgoingPage = new OutgoingInvoicesPage(authenticatedPage);
  await outgoingPage.goToOutgoingInvoices();
});

Then('I should see {string} page', async ({}) => {
  await outgoingPage.assertOnOutgoingInvoicesPage();
});
