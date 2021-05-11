Feature: In order to test ghost application
  As a site administrator
  I want to add items in navigation menus

  @user1 @web
  Scenario: Escenario 1: Agregar item en el menu de navegacion
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-settings a[href="#/settings/design/"]"
    When I enter "Escenario 1" into input field having xpath "(//form[@id='settings-navigation']/div/div/span[starts-with(@class,'gh-blognav-label')]/input)[last()]"
    When I click on element having css selector "#settings-navigation button.gh-blognav-add"
    Then I should see text "Escenario 1"
