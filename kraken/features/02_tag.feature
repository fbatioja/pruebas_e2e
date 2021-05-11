Feature: In order to test ghost application
  As a site administrator
  I want to create tags and edit them

  @user1 @web
  Scenario: Crear un tag, editarlo y verificar en la lista de tag la edición
    Given I login in ghost as admin
    Given I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/tags/"]"
    When I click on element having css selector "section.view-actions a[href="#/tags/new/"]"
    When I enter "Segundo tag" into input field having css selector "#tag-name"
    When I enter "Segundo slug" into input field having css selector "#tag-slug"
    When I enter "Segundo description" into input field having css selector "#tag-description"
    When I enter "Segundo meta title" into input field having css selector "#meta-title"
    When I enter "Segundo meta description" into input field having css selector "#meta-description"
    When I click on element having css selector "section.view-actions button"
    When I click on element having css selector "section.view-actions a[href="#/tags/new/"]" 
    When I click on element having css selector ".gh-tag-list-title h3"
    When I enter "Modificado" into input field having css selector "#tag-name"
    When I click on element having css selector "section.view-actions button" 
    When I click on element having css selector "section.view-actions a[href="#/tags/new/"]"
    Then I should see text "Segundo tagModificado"

