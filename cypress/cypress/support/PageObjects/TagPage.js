export class TagPage {
    setScenario (scenario) {
        this.scenario = scenario;
        if (Cypress.env('index_page') === 0) {
        // Cypress.env('time', Date.now());
        }
    }

    screenshot() {
        let filename = Cypress.env('version_app') +'/' + this.scenario + '/' + Cypress.env('index_page')+'_page'
        cy.screenshot(filename);
        Cypress.env('index_page', Cypress.env('index_page')+1);
        cy.wait(1000);
    }

    resetIndexScreshot() {
        Cypress.env('index_page', 0);
        // Cypress.env('time', 0);
    }
    
    navigateTag() {
        cy.get('.gh-nav-body .gh-nav-manage a[href="#/tags/"]').click();
    }

    clickNewTagButton() {
        cy.get('section.view-actions a[href="#/tags/new/"]').click();
        this.screenshot();
    }

    clickReturnTagLink() {
        cy.get('.gh-editor-header a[href="#/tags/"]').click();
        this.screenshot();
    }

    getListNamesTags() {
        return cy.get('.gh-tag-list-title h3');
    }

    setTagName(name) {
        cy.get('#tag-name').type(name, {"force": true});
    }

    setTagSlug(slug) {
        cy.get('#tag-slug').type(slug, {"force": true});
    }

    setTagDescription(description) {
        cy.get('#tag-description').type(description, {"force": true});
    }

    setTagMetaTitle(metaTitle) {
        cy.get('#meta-title').type(metaTitle, {"force": true});
    }

    setTagMetaDescription(metaDescription) {
        cy.get('#meta-description').type(metaDescription, {"force": true});
    }

    clickSaveButton() {
        cy.get('section.view-actions button').click();
        this.screenshot();
    }

    clickTag(name) {
        this.getListNamesTags().contains(name).click({ force: true });
        this.screenshot();
    }

    clickDeleteButton() {
        cy.contains('button', 'Delete tag').click();
        this.screenshot();
    }

    confirmDelete() {
        cy.get('section.modal-content button').contains('Delete').click();
    }

    getStatusTag(name) {
        return this.getListNamesTags().contains(name, {force: true}).parent('a').parent('li');
    }
}
