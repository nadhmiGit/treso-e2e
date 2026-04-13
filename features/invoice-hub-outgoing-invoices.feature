Feature: Invoice Hub - Outgoing Invoices

  Background: Pre conditions
    Given I am authenticated

  @smoke
  Scenario: Successfully navigate to Outgoing Invoices page
    When I navigate to "Outgoing Invoices"
    Then I should see "Outgoing Invoices" page

  @smoke
  Scenario: Verify outgoing invoices page is accessible after authentication
    When I navigate to "Invoice Hub/Outgoing Invoices"
    Then I should see "Outgoing Invoices" page

  @smoke
  Scenario: Navigate to outgoing invoices from Invoice Hub menu
    When I navigate to "Invoice Hub"
    And I navigate to "Outgoing Invoices"
    Then I should see "Outgoing Invoices" page
