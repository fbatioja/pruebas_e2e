import { LoginPage } from "../support/PageObjects/LoginPage";
import { StaffPage } from "../support/PageObjects/StaffPage";

describe('In order to test ghost application as a site administrator i want invite a new staff member', () => {
  const loginPage = new LoginPage();
  const pageObjectStaff = new StaffPage();
  pageObjectStaff.resetIndexScreenshot();
  beforeEach(()=>{
    cy.fixture('environment').then(function(data) {
      var loginUrl = '';
      if (data.url.endsWith('/')) {
        loginUrl = data.url + '#/signin';
      } else {
        loginUrl = data.url + '/#/signin';
      }
      cy.visit(loginUrl);
      cy.wait(1000);

      loginPage.login(data.email, data.password);
      pageObjectStaff.navigateStaff();
    });
  });

  context('Sucessfull Author user invitation', () => {
    let userEmail = 'user@contoso.com';
    it('Invite user with default role', () => {
      pageObjectStaff.setScenario('author_user_invitation');
      pageObjectStaff.clickInvitePeopleButton();
      pageObjectStaff.setUserEmail(userEmail);
      pageObjectStaff.clickSendInvitationButton();
    });
    it('Check user invitation', () => {
      pageObjectStaff.setScenario('author_user_invitation');
      pageObjectStaff.checkUserInvitation(userEmail);
      pageObjectStaff.resetIndexScreenshot();
    });
  });

  context('Sucessfull Administrator user invitation', () => {
    let userEmail = 'adminuser@contoso.com';
    let role = 'Administrator';
    it('Invite user with admin role', () => {
      pageObjectStaff.setScenario('administrator_user_invitation');
      pageObjectStaff.clickInvitePeopleButton();
      pageObjectStaff.setUserEmail(userEmail);
      pageObjectStaff.setUserRol(role);
      pageObjectStaff.clickSendInvitationButton();
    });
    it('Check user invitation', () => {
      pageObjectStaff.setScenario('administrator_user_invitation');
      pageObjectStaff.checkUserInvitation(userEmail);
      pageObjectStaff.resetIndexScreenshot();
    });
  });

  context('Duplicated user invitation', () => {
    let userEmail = 'user@contoso.com';
    it('Invite an invited user', () => {
      pageObjectStaff.setScenario('duplicated_user_invitation');
      pageObjectStaff.clickInvitePeopleButton();
      pageObjectStaff.setUserEmail(userEmail);
      pageObjectStaff.clickSendInvitationButton();
      pageObjectStaff.checkDuplicatedEmail();
      pageObjectStaff.resetIndexScreenshot();
    });
  });

  context('Empty user invitation', () => {
    let userEmail = ' ';
    it('Invite an empty user', () => {
      pageObjectStaff.setScenario('empty_user_invitation');
      pageObjectStaff.clickInvitePeopleButton();
      pageObjectStaff.setUserEmail(userEmail);
      pageObjectStaff.clickSendInvitationButton();
      pageObjectStaff.checkEmptyEmail();
      pageObjectStaff.resetIndexScreenshot();
    });
  });

  context('Invalid user invitation', () => {
    let userEmail = 'user.contoso.com';
    it('Invite an invalid user', () => {
      pageObjectStaff.setScenario('invalid_user_invitation');
      pageObjectStaff.clickInvitePeopleButton();
      pageObjectStaff.setUserEmail(userEmail);
      pageObjectStaff.clickSendInvitationButton();
      pageObjectStaff.checkInvalidEmail();
      pageObjectStaff.resetIndexScreenshot();
    });
  });
});
