Feature: In order to test ghost application
  As a site administrator
  I want to add items in navigation menus

  @user1 @web
  Scenario: Escenario 2: Agregar item en el menu de navegacion secundario
    Given I set scenario "agregar_item_en_el_menu_de_navegacion_secundario"
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-settings a[href="#/settings/design/"]"
    When I enter "Escenario 2" into input field having xpath "(//form[@id='secondary-navigation']/div/div/span[starts-with(@class,'gh-blognav-label')]/input)[last()]"
    When I click on element having css selector "#secondary-navigation button.gh-blognav-add"
    Then I should see text "Escenario 2"
