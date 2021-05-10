Feature: In order to test ghost application
  As a site administrator
  I want to create pages

  @user1 @web
  Scenario: Escenario 2: Crear una pagina y publicarla
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/pages/"]"
    Given I click on element having css selector "section .view-actions a[href="#/editor/page/"]"
    Given I enter "Escenario 2: Crear una pagina y publicarla" into input field having css selector "textarea.gh-editor-title"
    Given I click on element having css selector "article.koenig-editor"
    When I click on element having css selector "section.view-actions .gh-publishmenu"
    When I click on element having css selector "button.gh-publishmenu-button"
    When I click on element having css selector ".gh-editor-header a[href="#/pages/"]"
    When I click on element having css selector ".gh-contentfilter .gh-contentfilter-menu-trigger"
    When I click on element having xpath "//li[text()='Published pages']"
    Then I should see text "Escenario 2: Crear una pagina y publicarla"
