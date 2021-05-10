Feature: In order to test ghost application
  As a site administrator
  I want to create posts, publish it and unpublish it

  @user1 @web
  Scenario: Escenario 3: Crear un post, publicar post y despublicarlo
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/posts/"]"
    Given I click on element having css selector "section .view-actions a[href="#/editor/post/"]"
    Given I enter "Escenario 3: Crear un post, publicar post y despublicarlo" into input field having css selector "textarea.gh-editor-title"
    Given I click on element having css selector "article.koenig-editor"
    Given I click on element having css selector "section.view-actions .gh-publishmenu"
    Given I click on element having css selector "button.gh-publishmenu-button"
    Given I click on element having css selector ".gh-editor-header a[href="#/posts/"]"
    When I click on element having css selector ".gh-contentfilter .gh-contentfilter-menu-trigger"
    When I click on element having xpath "//li[text()='Published posts']"
    When I click on element having xpath "(//h3[text()='Escenario 3: Crear un post, publicar post y despublicarlo'])[1]"
    When I click on element having css selector "section.view-actions .gh-publishmenu"
    When I click on element having xpath "//div[text()='Unpublished']"
    When I click on element having css selector "button.gh-publishmenu-button"
    When I click on element having css selector ".gh-editor-header a[href="#/posts/?type=published"]"
    When I click on element having css selector ".gh-contentfilter .gh-contentfilter-menu-trigger"
    When I click on element having xpath "//li[text()='Draft posts']"
    Then I should see text "Escenario 3: Crear un post, publicar un post y despublicarlo"
