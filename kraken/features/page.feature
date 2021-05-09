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

  @user2 @web
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

  @user3 @web
  Scenario: Escenario 3: Crear una pagina y despublicarla
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/pages/"]"
    Given I click on element having css selector "section .view-actions a[href="#/editor/page/"]"
    Given I enter "Escenario 3: Crear una pagina y despublicarla" into input field having css selector "textarea.gh-editor-title"
    Given I click on element having css selector "article.koenig-editor"
    Given I click on element having css selector "section.view-actions .gh-publishmenu"
    Given I click on element having css selector "button.gh-publishmenu-button"
    Given I click on element having css selector ".gh-editor-header a[href="#/pages/"]"
    When I click on element having css selector ".gh-contentfilter .gh-contentfilter-menu-trigger"
    When I click on element having xpath "//li[text()='Published pages']"
    When I click on element having xpath "(//h3[text()='Escenario 3: Crear una pagina y despublicarla'])[1]"
    When I click on element having css selector "section.view-actions .gh-publishmenu"
    When I click on element having xpath "//div[text()='Unpublished']"
    When I click on element having css selector "button.gh-publishmenu-button"
    When I click on element having css selector ".gh-editor-header a[href="#/pages/?type=published"]"
    When I click on element having css selector ".gh-contentfilter .gh-contentfilter-menu-trigger"
    When I click on element having xpath "//li[text()='Draft pages']"
    Then I should see text "Escenario 3: Crear una pagina y despublicarla"

  @user4 @web
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
