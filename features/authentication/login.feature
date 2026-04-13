Feature: User Login

  Background: Pre conditions
    Given I navigate to the treso login page

  @login
  Scenario Outline: Validate valid & invalid login
    When I login with valid credentials
    Then I should be redirected to the dashboard
