Feature: In order to test ghost application
  As a site administrator
  I want to create tags and delete it

  @user1 @web
  Scenario: Escenario 3: Crear una tag y eliminarlo
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/tags/"]'"
    When I click on element having css selector "section.view-actions a[href="#/tags/new/"]"
    When I enter "Tercero tag" into input field having css selector "#tag-name"
    When I enter "Tercero slug" into input field having css selector "#tag-slug"
    When I enter "Tercero description" into input field having css selector "#tag-description"
    When I enter "Tercero meta title" into input field having css selector "#meta-title"
    When I enter "Tercero meta description" into input field having css selector "#meta-description"
    When I click on element having css selector "section.view-actions button"
    When I click on element having css selector "section.view-actions a[href="#/tags/new/"]"
    When I click on element having css selector ".gh-tag-list-title h3"
    Then I click on element having xpath ".//span[text()='Delete tag']"
    Then I click on element having xpath ".//span[text()='Delete']"

