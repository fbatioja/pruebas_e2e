Feature: In order to test ghost application
  As a site administrator
  I want invite a new staff member

  @user1 @web
  Scenario: Invalid email input
    Given I login in ghost as admin
    Then I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/staff/"]"
    Then I click on element having css selector "button.gh-btn-green"
    Then I enter "user.contoso.com" into input field having id "new-user-email"
    Then I click on element having css selector "button.gh-btn.gh-btn-green.gh-btn-icon.ember-view"
    Then I should see text "Invalid Email."
