export class StaffPage {
  navigateStaff() {
    cy.get('.gh-nav-body .gh-nav-manage a[href="#/staff/"]').click();
  }

  clickInvitePeopleButton() {
    return cy.get('button.gh-btn-green').click();
  }

  setUserEmail(email) {
    cy.get('#new-user-email').type(email);
  }

  setUserRol(role) {
    cy.get('select#new-user-role').select(role);
  }

  clickSendInvitationButton() {
    return cy.get('button.gh-btn.gh-btn-green.gh-btn-icon.ember-view').click();
  }

  checkUserInvitation(email) {
    cy.contains(email);
  }

  checkEmptyEmail() {
    cy.get('p.response').contains('Please enter an email.');
  }

  checkInvalidEmail() {
    cy.get('p.response').contains('Invalid Email.');
  }

  checkDuplicatedEmail() {
    cy.get('p.response').contains('A user with that email address was already invited.');
  }
}