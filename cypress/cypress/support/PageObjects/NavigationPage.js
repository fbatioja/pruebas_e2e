export class NavigationPage {
    navigatePage() {
        cy.get('.gh-nav-body .gh-nav-settings a[href="#/settings/design/"]').click();
    }

    clickButtonAddMenu1() {
        cy.get('#settings-navigation button.gh-blognav-add').click({'force': true});
    }

    setLabelMenu1(text) {
        cy.get('#settings-navigation .gh-blognav-label input.gh-input').last().type(text, {'force': true});
    }

    clickSaveButton() {
        cy.get('section.view-actions button').contains('Save').click();
    }

    setLabelMenu2(text) {
        cy.get('#secondary-navigation .gh-blognav-label input.gh-input').last().type(text, {'force': true});
    }

    clickButtonAddMenu2() {
        cy.get('#secondary-navigation button.gh-blognav-add').click({'force': true});
    }

    getInputsLabelMenu1() {
        return cy.get('#settings-navigation .gh-blognav-label input.gh-input');
    }
    getInputsLabelMenu2() {
        return cy.get('#secondary-navigation .gh-blognav-label input.gh-input');
    }

    setUrlMenu1(text) {
        cy.get('#settings-navigation .gh-blognav-url input.gh-input').last().type(text, {'force': true});
    }

    setUrlMenu2(text) {
        cy.get('#secondary-navigation .gh-blognav-url input.gh-input').last().type(text, {'force': true});
    }

    getInputsUrlMenu1() {
        return cy.get('#settings-navigation .gh-blognav-url input.gh-input');
    }

    getInputsUrlMenu2() {
        return cy.get('#secondary-navigation .gh-blognav-url input.gh-input');
    }
}
