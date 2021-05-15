Feature: In order to test ghost application
  As a site administrator
  I want to create posts and remove it

  @user1 @web
  Scenario: Escenario 4: Crear un post y eliminarlo
    Given I set scenario "post"
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/posts/"]"
    Given I click on element having css selector "section .view-actions a[href="#/editor/post/"]"
    Given I enter "Escenario 4: Crear un post y eliminarlo" into input field having css selector "textarea.gh-editor-title"
    Given I click on element having css selector "article.koenig-editor"
    Given I click on element having css selector ".gh-editor-header a[href="#/posts/"]"
    When I click on element having xpath "(//h3[text()='Escenario 4: Crear un post y eliminarlo'])[1]"
    When I click on element having css selector "section.view-actions button.post-settings"
    When I click on element having css selector "button.settings-menu-delete-button"
    Then I click on element having xpath "//button/span[text()='Delete']"
    Then I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/posts/"]"
