Feature: In order to test ghost application
  As a site administrator
  I want invite a new staff member
 
  @user1 @web
  Scenario: Empty email input
    Given I login in ghost as admin
    Then I click on element having id "ember18"
    Then I click on element having css selector "button.gh-btn-green"
    Then I click on element having css selector "button.gh-btn.gh-btn-green.gh-btn-icon.ember-view"
    Then I should see text "Please enter an email."
