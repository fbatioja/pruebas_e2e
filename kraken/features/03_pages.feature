Feature: In order to test ghost application
  As a site administrator
  I want to create pages

  @user1 @web
  Scenario: Escenario 3: Crear una pagina y despublicarla
    Given I set scenario "crear_una_pagina_y_despublicarla"
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
