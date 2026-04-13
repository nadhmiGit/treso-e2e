Feature: Invoice Hub - Incoming Invoices

  Background: Pre conditions
    Given I am on the incoming invoices page

  @regression
  Scenario: Filter invoices by "À valider" status tab and verify row count matches badge
    When I click on the "À valider" status tab
    Then the "À valider" tab badge should display "2"
    And the invoice table should be visible
    And the invoice list should contain "2" rows
    And the "À valider" tab should be selected

  @regression
  Scenario: Verify all status tabs display correct invoice counts
    When I view the status tabs
    Then the "Toutes" tab should display count "6"
    And the "À valider" tab should display count "2"
    And the "Approuvées" tab should display count "4"
    And the "En dématérialisation" tab should display count "0"
    And the "Déclinées" tab should display count "0"

  @regression
  Scenario: Verify invoice table displays supplier and amount correctly
    When I view the invoice table
    Then I should see supplier "MAGASINS GALERIES LAFAYETTE" in the table
    And I should see amount "€ 430,48" in the table
    And the column header "Fournisseur" should be visible
    And the column header "Montant TTC" should be visible

  @regression @incoming-invoices
  Scenario: Verify all status tabs are visible on the incoming invoices page
    When I view the status tabs
    Then the "Toutes" tab should be visible
    And the "En dématérialisation" tab should be visible
    And the "À valider" tab should be visible
    And the "Approuvées" tab should be visible
    And the "A résoudre" tab should be visible
    And the "Acquittées" tab should be visible
    And the "Déclinées" tab should be visible

  @regression @incoming-invoices
  Scenario: Verify the invoice table displays the expected column headers
    When I view the invoice table
    Then the column header "Fournisseur" should be visible
    And the column header "Montant TTC" should be visible
    And the column header "N° de la pièce" should be visible
    And the column header "Statut paiement" should be visible

  @regression @incoming-invoices
  Scenario: Filtering by "Approuvées" tab shows only approved invoices
    When I click on the "Approuvées" status tab
    Then the "Approuvées" tab should be selected
    And the invoice table should be visible
    And the page URL should contain "approved"

  @smoke @incoming-invoices
  Scenario: The "Déposer une facture PDF" button is visible
    Then the "Déposer une facture PDF" button should be visible

  @regression @incoming-invoices
  Scenario: Verify the "En litige" invoice has a comment "Facture approuvée pour paiement"
    When I open the first invoice with status "En litige"
    And I click on the "Commentaires" tab in the invoice detail panel
    Then the comment "Facture approuvée pour paiement" should be visible in the invoice panel
