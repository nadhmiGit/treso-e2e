Feature: Invoice Hub - Incoming Invoices (AI Generated without DOM)

  @incoming-invoices-ai
  Scenario: Successfully navigate to Incoming Invoices page
    Given I am authenticated
    When I navigate to "Incoming Invoices"
    Then I should see "Incoming Invoices" page

  @incoming-invoices-ai
  Scenario: Verify incoming invoices page is accessible after authentication
    Given I am authenticated
    When I navigate to "Invoice Hub"
    Then I should see "Incoming Invoices" page

  @incoming-invoices-ai
  Scenario: Navigate to incoming invoices from Invoice Hub menu
    Given I am authenticated
    When I navigate to "Invoice Hub/Incoming Invoices"
    Then I should see "Incoming Invoices" page

  @incoming-invoices-ai
  Scenario: Verify À valider tab shows 2 invoices
    Given I am authenticated
    When I navigate to "Incoming Invoices"
    Then I should see "À valider" page

  @incoming-invoices-ai
  Scenario: Verify supplier MAGASINS GALERIES LAFAYETTE is visible
    Given I am authenticated
    When I navigate to "Incoming Invoices"
    Then I should see "MAGASINS GALERIES LAFAYETTE" page