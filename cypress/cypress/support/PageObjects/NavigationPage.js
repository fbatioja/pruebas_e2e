export class NavigationPage {
    setScenario (scenario) {
        this.scenario = scenario;
        if (Cypress.env('index_navigation') === 0) {
            Cypress.env('time', Date.now());
        }
    }

    screenshot() {
        let filename = Cypress.env('version_app') +'/' + this.scenario + '/' + Cypress.env('time') + '/' + Cypress.env('index_navigation')+'_navigation'
        cy.screenshot(filename);
        Cypress.env('index_navigation', Cypress.env('index_navigation')+1);
        cy.wait(1000);
    }

    resetIndexScreshot() {
        Cypress.env('index_navigation', 0);
        Cypress.env('time', 0);
    }

    navigatePage() {
        cy.get('.gh-nav-body .gh-nav-settings a[href="#/settings/design/"]').click();
        this.screenshot();
    }

    clickButtonAddMenu1() {
        cy.get('#settings-navigation button.gh-blognav-add').click({'force': true});
        this.screenshot();
    }

    setLabelMenu1(text) {
        cy.get('#settings-navigation .gh-blognav-label input.gh-input').last().type(text, {'force': true});
    }

    clickSaveButton() {
        cy.get('section.view-actions button').contains('Save').click();
        this.screenshot();
    }

    setLabelMenu2(text) {
        cy.get('#secondary-navigation .gh-blognav-label input.gh-input').last().type(text, {'force': true});
    }

    clickButtonAddMenu2() {
        cy.get('#secondary-navigation button.gh-blognav-add').click({'force': true});
        this.screenshot();
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
