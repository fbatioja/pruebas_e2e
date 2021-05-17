Feature: In order to test ghost application
  As a site administrator
  I want to create tags

  @user1 @web
  Scenario: Crear un tag y verificar la existencia del tag en la lista de tags
    Given I set scenario "crear_tag_y_listarlo"
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/tags/"]"
    When I click on element having css selector "section.view-actions a[href="#/tags/new/"]"
    When I enter "Primer tag" into input field having css selector "#tag-name"
    When I enter "Primer slug" into input field having css selector "#tag-slug"
    When I enter "Primer description" into input field having css selector "#tag-description"
    # When I enter "Primer meta title" into input field having css selector "#meta-title"
    # When I enter "Primer meta description" into input field having css selector "#meta-description"
    When I click on element having css selector "section.view-actions button"
    Then I should see text "Primer tag"

