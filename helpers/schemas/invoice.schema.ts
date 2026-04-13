import { expect } from '@playwright/test';

/**
 * Invoice Schema — TRESO2 API
 *
 * Validates the structure of an invoice object returned by the API.
 * Used for contract testing — verifies shape, not exact values.
 */

const REQUIRED_FIELDS = [
  'invoiceId',
  'documentId',
  'status',
  'currency',
  'seller',
  'buyer',
  'total',
  'invoiceDirection',
  'createdAt',
];

const REQUIRED_TOTAL_FIELDS = ['amountHT', 'amountVAT', 'amountTTC'];

export function assertInvoiceSchema(invoice: any) {
  // Required top-level fields
  for (const field of REQUIRED_FIELDS) {
    expect(invoice, `Missing field: ${field}`).toHaveProperty(field);
  }

  // Status must be a DGFIP number
  expect(typeof invoice.status).toBe('number');
  expect(invoice.status).toBeGreaterThanOrEqual(200);
  expect(invoice.status).toBeLessThanOrEqual(212);

  // Total must have all amount fields
  for (const field of REQUIRED_TOTAL_FIELDS) {
    expect(invoice.total, `Missing total field: ${field}`).toHaveProperty(field);
  }

  // Amounts must be positive numbers
  expect(invoice.total.amountTTC).toBeGreaterThan(0);
  expect(invoice.total.amountHT).toBeGreaterThan(0);

  // Direction must be valid
  expect(['INCOMING', 'OUTGOING']).toContain(invoice.invoiceDirection);
}
