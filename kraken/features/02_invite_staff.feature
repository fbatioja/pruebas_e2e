Feature: In order to test ghost application
  As a site administrator
  I want invite a new staff member

  @user1 @web
  Scenario: Sucessfull Administrator user invitation
    Given I login in ghost as admin
    Then I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/staff/"]"
    Then I click on element having css selector "button.gh-btn-green"
    Then I enter "adminuser@contoso.com" into input field having id "new-user-email"
    Then I select option with text "Administrator" for dropdown with id "new-user-role"
    Then I click on element having css selector "button.gh-btn.gh-btn-green.gh-btn-icon.ember-view"
    Then I should see text "adminuser@contoso.com"
