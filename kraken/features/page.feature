Feature: Funcionalidad: Pagina

  @user1 @web
  Scenario: Escenario 1: Crear una pagina y listarla
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/pages/"]"
    When I click on element having css selector "section .view-actions a[href="#/editor/page/"]"
    When I enter "Escenario 1: Crear una pagina y listarla" into input field having css selector "textarea.gh-editor-title"
    When I click on element having css selector "article.koenig-editor"
    When I click on element having css selector ".gh-editor-header a[href="#/pages/"]"
    Then I should see text "Escenario 1: Crear una pagina y listarla"

