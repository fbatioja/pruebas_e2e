Feature: In order to test ghost application
  As a site administrator
  I want to create posts and publish it

  @user1 @web
  Scenario: Escenario 2: Crear un post y publicarlo
  ` Given I set scenario "Crear un post y publicarlo"
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/posts/"]"
    Given I click on element having css selector "section .view-actions a[href="#/editor/post/"]"
    Given I enter "Escenario 2: Crear un post y publicarlo" into input field having css selector "textarea.gh-editor-title"
    Given I click on element having css selector "article.koenig-editor"
    When I click on element having css selector "section.view-actions .gh-publishmenu"
    When I click on element having css selector "button.gh-publishmenu-button"
    When I click on element having css selector ".gh-editor-header a[href="#/posts/"]"
    When I click on element having css selector ".gh-contentfilter .gh-contentfilter-menu-trigger"
    When I click on element having xpath "//li[text()='Published posts']"
    Then I should see text "Escenario 2: Crear un post y publicarlo"
