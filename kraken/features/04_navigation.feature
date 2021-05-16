Feature: In order to test ghost application
  As a site administrator
  I want to add items in navigation menus

  @user1 @web
  Scenario: Escenario 4: Ingresar URL sin formato menu 2
    Given I set scenario "ingresar_url_sin_formato_menu_2"
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-settings a[href="#/settings/design/"]"
    When I enter "Escenario 2" into input field having xpath "(//form[@id='secondary-navigation']/div/div/span[starts-with(@class,'gh-blognav-label')]/input)[last()]"
    When I enter "BadURL\" into input field having xpath "(//form[@id='secondary-navigation']/div/div/span[starts-with(@class,'gh-blognav-url')]/input)[last()]"
    When I click on element having css selector "#secondary-navigation button.gh-blognav-add"
