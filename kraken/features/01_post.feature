Feature: In order to test ghost application
  As a site administrator
  I want to create posts and list it

  @user1 @web
  Scenario: Escenario 1: Crear un post y listarlo
    Given I set scenario "post"
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/posts/"]"
    When I click on element having css selector "section .view-actions a[href="#/editor/post/"]"
    When I enter "Escenario 1: Crear un post y listarlo" into input field having css selector "textarea.gh-editor-title"
    When I click on element having css selector "article.koenig-editor"
    When I click on element having css selector ".gh-editor-header a[href="#/posts/"]"
    Then I should see text "Escenario 1: Crear un post y listarlo"
