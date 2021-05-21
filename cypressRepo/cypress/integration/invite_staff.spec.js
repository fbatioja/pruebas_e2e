import { LoginPage } from "../support/PageObjects/LoginPage";
import { StaffPage } from "../support/PageObjects/StaffPage";
const aprioriDataPool = require('../fixtures/staff-email.json');
var faker = require('faker');

function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];
  return item;
}

describe('In order to test ghost application as a site administrator i want invite a new staff member', () => {
  const loginPage = new LoginPage();
  const pageObjectStaff = new StaffPage();
  const scenariosQuantity = 5;
  const featureIterations = 30;
  const scenarieIterations = Math.ceil(featureIterations / scenariosQuantity);
  const pseudoDataPool = loginPage.getPseudoDataPool('staff-email');
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
    // Apriori data-pool
    for (let index = 0; index < scenarieIterations; index++) {
      const item = aprioriDataPool[index];
      let userEmail = item.email;
      let role = item.role;
      it('Invite user with default role', () => {
        pageObjectStaff.setScenario('author_user_invitation');
        pageObjectStaff.clickInvitePeopleButton();
        pageObjectStaff.setUserEmail(userEmail);
        pageObjectStaff.setUserRol(role);
        pageObjectStaff.clickSendInvitationButton();
      });
      it('Check user invitation', () => {
        pageObjectStaff.setScenario('author_user_invitation');
        pageObjectStaff.checkUserInvitation(userEmail);
        pageObjectStaff.resetIndexScreenshot();
      });
    }
  });

  context('Duplicated user invitation', () => {
    // Apriori data-pool
    for (let index = 0; index < scenarieIterations; index++) {
      const item = aprioriDataPool[index];
      let userEmail = item.email;
      let role = item.role;
      it('Invite an invited user', () => {
        pageObjectStaff.setScenario('duplicated_user_invitation');
        pageObjectStaff.clickInvitePeopleButton();
        pageObjectStaff.setUserEmail(userEmail);
        pageObjectStaff.setUserRol(role);
        pageObjectStaff.clickSendInvitationButton();
        pageObjectStaff.checkDuplicatedEmail();
        pageObjectStaff.resetIndexScreenshot();
      });
    }
  });

  context('Empty user invitation', () => {
    // Pseudo data-pool
    for (let index = 0; index < scenarieIterations; index++) {
      const item = getRandomItem(pseudoDataPool);
      let userEmail = item.empty_email === null ? '' : item.empty_email;
      let role = item.role;
      it('Invite an empty user', () => {
        pageObjectStaff.setScenario('empty_user_invitation');
        pageObjectStaff.clickInvitePeopleButton();
        pageObjectStaff.setUserEmail(userEmail);
        pageObjectStaff.setUserRol(role);
        pageObjectStaff.clickSendInvitationButton();
        pageObjectStaff.checkEmptyEmail();
        pageObjectStaff.resetIndexScreenshot();
      });
    }
  });

  context('Invalid user invitation', () => {
    // Pseudo data-pool
    for (let index = 0; index < scenarieIterations; index++) {
      const item = getRandomItem(pseudoDataPool);
      let userEmail = item.invalid_email;
      let role = item.role;
      it('Invite an invalid user', () => {
        pageObjectStaff.setScenario('invalid_user_invitation');
        pageObjectStaff.clickInvitePeopleButton();
        pageObjectStaff.setUserEmail(userEmail);
        pageObjectStaff.setUserRol(role);
        pageObjectStaff.clickSendInvitationButton();
        pageObjectStaff.checkInvalidEmail();
        pageObjectStaff.resetIndexScreenshot();
      });
    }
  });

  context('Sucessfull Administrator user invitation', () => {
    // Random data
    for (let index = 0; index < scenarieIterations; index++) {
      let userEmail = faker.internet.email();
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
    }
  });
});
