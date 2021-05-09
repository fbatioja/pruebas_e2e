export class LoginPage {

    login(email, password) {
        cy.get('input[name="identification"]').type(email);
        cy.get('input[name="password"]').type(password);
        cy.get('#login button[type="submit"]').click();
    }
}
