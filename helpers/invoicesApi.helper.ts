import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { assertInvoiceSchema } from './schemas/invoice.schema';

/**
 * API Helper — Invoices
 *
 * Handles all API interactions related to invoices.
 * Follows the Page Object pattern applied to API testing.
 *
 * Rules applied:
 * - No hardcoded values — all assertions are relative or schema-based
 * - Behavior testing — LIKE "list is valid" not "list has 6 items"
 * - Schema validation — structure is verified, not exact values
 */

export class InvoicesApiHelper {
  private lastResponse: APIResponse | null = null;
  private lastInvoices: any[] | null = null;

  constructor(private readonly request: APIRequestContext) {}

  // ─── Private ────────────────────────────────────────────────────────────────

  private async fetchAndParse(url: string) {
    this.lastResponse = await this.request.get(url);

    if (!this.lastResponse.ok()) {
      const body = await this.lastResponse.text();
      throw new Error(
        `API request failed — status: ${this.lastResponse.status()}\nURL: ${url}\nBody: ${body}`,
      );
    }

    this.lastInvoices = await this.lastResponse.json();
  }

  // ─── Fetch methods ──────────────────────────────────────────────────────────

  async fetchAllIncomingInvoices() {
    await this.fetchAndParse('/v2/invoices?invoiceDirection=INCOMING');
  }

  async fetchIncomingInvoicesByStatus(status: number) {
    await this.fetchAndParse(`/v2/invoices?invoiceDirection=INCOMING&status[]=${status}`);
  }

  // ─── Assertions ─────────────────────────────────────────────────────────────

  assertResponseStatusOk() {
    expect(this.lastResponse!.status()).toBe(200);
  }

  // Rule 1: behavior testing — not a hardcoded count
  assertResponseIsValidList() {
    expect(Array.isArray(this.lastInvoices)).toBe(true);
  }

  // Rule 2: behavior testing — fewer results after filtering
  assertFilteredListIsSmallerThan(totalCount: number) {
    expect(this.lastInvoices!.length).toBeLessThan(totalCount);
  }

  // Rule 3: schema validation — structure, not exact values
  assertEachInvoiceHasValidSchema() {
    for (const invoice of this.lastInvoices!) {
      assertInvoiceSchema(invoice);
    }
  }

  assertEachInvoiceHasField(field: string) {
    for (const invoice of this.lastInvoices!) {
      expect(invoice).toHaveProperty(field);
    }
  }

  assertEachInvoiceHasStatus(status: number) {
    for (const invoice of this.lastInvoices!) {
      expect(invoice.status).toBe(status);
    }
  }

  assertEachInvoiceHasDirection(direction: 'INCOMING' | 'OUTGOING') {
    for (const invoice of this.lastInvoices!) {
      expect(invoice.invoiceDirection).toBe(direction);
    }
  }

  getInvoiceCount(): number {
    return this.lastInvoices!.length;
  }
}
