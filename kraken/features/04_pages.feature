Feature: In order to test ghost application
  As a site administrator
  I want to create pages

  @user1 @web
  Scenario: Escenario 4: Crear una pagina y eliminarla
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/pages/"]"
    Given I click on element having css selector "section .view-actions a[href="#/editor/page/"]"
    Given I enter "Escenario 4: Crear una pagina y eliminarla" into input field having css selector "textarea.gh-editor-title"
    Given I click on element having css selector "article.koenig-editor"
    Given I click on element having css selector ".gh-editor-header a[href="#/pages/"]"
    When I click on element having xpath "(//h3[text()='Escenario 4: Crear una pagina y eliminarla'])[1]"
    When I click on element having css selector "section.view-actions button.post-settings"
    When I click on element having css selector "button.settings-menu-delete-button"
    Then I click on element having xpath "//button/span[text()='Delete']"
    Then I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/pages/"]"
