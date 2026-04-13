Feature: Invoice API - Incoming Invoices

  Background: Pre conditions
    Given I have an authenticated API context

  @api
  Scenario: Get all incoming invoices returns a valid list
    When I request all incoming invoices from the API
    Then the response status should be 200
    And the response should be a non-empty array
    And each invoice should have a valid schema
    And each invoice should have the "INCOMING" direction

  @api
  Scenario: Filter by status "À valider" returns fewer invoices than total
    When I request all incoming invoices from the API
    And I request incoming invoices with status "203" from the API
    Then the filtered list should contain fewer invoices than the total
    And each invoice should have status "203"
    And each invoice should have a valid schema

  @api
  Scenario: Filter by status "Approuvées" returns fewer invoices than total
    When I request all incoming invoices from the API
    And I request incoming invoices with status "205" from the API
    Then the filtered list should contain fewer invoices than the total
    And each invoice should have status "205"
    And each invoice should have a valid schema

  # @api
  # @regression
  # Scenario: UI incoming invoice count matches API count
  #   Given I am authenticated
  #   When I request all incoming invoices from the API
  #   And I navigate to the incoming invoices page via UI
  #   Then the response should contain "6" invoices
  #   And the UI total count should match the API total count
