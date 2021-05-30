export class StaffPage {
  setScenario (scenario) {
    this.scenario = scenario;
  }

  screenshot() {
    let filename = `${Cypress.env('version_app')}/${this.scenario}/${Cypress.env('index_page')}_staff`;
    cy.screenshot(filename);
    Cypress.env('index_page', Cypress.env('index_page')+1);
    cy.wait(1000);
  }

  resetIndexScreenshot() {
    Cypress.env('index_page', 0);
  }

  navigateStaff() {
    cy.get('.gh-nav-body .gh-nav-manage a[href="#/staff/"]').click();
  }

  clickInvitePeopleButton() {
    cy.get('button.gh-btn-green').click();
  }

  setUserEmail(email) {
    cy.get('#new-user-email').type(email);
  }

  setUserRol(role) {
    cy.get('select#new-user-role').select(role);
  }

  clickSendInvitationButton() {
    cy.get('button.gh-btn.gh-btn-green.gh-btn-icon.ember-view').click();
    this.screenshot();
  }

  checkUserInvitation(email) {
    cy.contains(email);
    this.screenshot();
  }

  checkEmptyEmail() {
    cy.get('p.response').contains('Please enter an email.');
    this.screenshot();
  }

  checkInvalidEmail() {
    cy.get('p.response').contains('Invalid Email.');
    this.screenshot();
  }

  checkDuplicatedEmail() {
    cy.get('p.response').contains('A user with that email address was already invited.');
    this.screenshot();
  }
}
