/**
 * API Test Data — TRESO2 Invoice Hub (Staging)
 *
 * Static reference data and dynamic generators for API tests.
 *
 * Entities used in staging environment:
 * - Seller: MAGASINS GALERIES LAFAYETTE (supplier)
 * - Buyer: Mars Chocolat France (client)
 *
 * DGFIP invoice statuses:
 * - 202: Received (set on creation, read-only)
 * - 203: To validate (set by validation workflow, read-only)
 * - 204-212: Patchable via PATCH endpoints
 */

export const API_TEST_DATA = {
  seller: {
    companyRegistrationId: '957503931',
    name: 'MAGASINS GALERIES LAFAYETTE',
  },
  buyer: {
    companyRegistrationId: '494887854',
    name: 'Mars Chocolat France',
  },
  invoice: {
    currency: 'EUR' as const,
    operationCategory: 'LB' as const,
    vatRate: 0.2,
  },
  expectedStatuses: {
    received: 202,
    toValidate: 203,
    supported: 204,
    approved: 205,
    partiallyApproved: 206,
    disputed: 207,
    suspended: 208,
    completed: 209,
    refused: 210,
    paymentSent: 211,
    collected: 212,
  },
  patchableStatuses: [204, 205, 206, 207, 208, 209, 210, 211, 212],
};

export const generateCreditNoteData = () => {
  const timestamp = Date.now();
  const amountHT = parseFloat((Math.random() * 900 + 100).toFixed(2));
  const amountVAT = parseFloat((amountHT * API_TEST_DATA.invoice.vatRate).toFixed(2));
  const amountTTC = parseFloat((amountHT + amountVAT).toFixed(2));
  const dueDate = new Date(timestamp + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return {
    documentId: `CN-TEST-${timestamp}`,
    internalDocumentId: `INT-CN-${timestamp}`,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate,
    currency: API_TEST_DATA.invoice.currency,
    operationCategory: API_TEST_DATA.invoice.operationCategory,
    total: { amountHT, amountVAT, amountTTC },
    seller: { companyRegistrationId: API_TEST_DATA.seller.companyRegistrationId },
    buyer: { companyRegistrationId: API_TEST_DATA.buyer.companyRegistrationId },
  };
};
