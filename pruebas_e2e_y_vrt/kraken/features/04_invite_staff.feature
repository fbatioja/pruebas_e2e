Feature: In order to test ghost application
  As a site administrator
  I want invite a new staff member

  @user1 @web
  Scenario: Empty email input
    Given I set scenario "empty_user_invitation"
    Given I login in ghost as admin
    Then I click on element having css selector ".gh-nav-body .gh-nav-manage a[href="#/staff/"]"
    Then I click on element having css selector "button.gh-btn-green"
    Then I click on element having css selector "button.gh-btn.gh-btn-green.gh-btn-icon.ember-view"
    Then I should see text "Please enter an email."
