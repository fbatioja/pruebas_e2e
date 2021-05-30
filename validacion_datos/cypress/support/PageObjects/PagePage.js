export class PagePage {
    setScenario (scenario) {
        this.scenario = scenario;
    }

    screenshot() {
        let filename = Cypress.env('version_app') +'/' + this.scenario + '/' + Cypress.env('index_page')+'_page'
        cy.screenshot(filename);
        Cypress.env('index_page', Cypress.env('index_page')+1);
        cy.wait(1000);
    }

    resetIndexScreshot() {
        Cypress.env('index_page', 0);
    }

    navigatePage() {
        cy.get('.gh-nav-body .gh-nav-manage a[href="#/pages/"]').click();
    }

    clickNewPageButton() {
        cy.get('section .view-actions a[href="#/editor/page/"]').click();
        this.screenshot();
    }

    clickReturnPageLink() {
        cy.get('.gh-editor-header a[href="#/pages/"]').click();
        this.screenshot();
    }

    getListTitlesPage() {
        return cy.get('ol.gh-list h3');
    }

    setPageTitle(title) {
        cy.get('textarea.gh-editor-title').type(title);
    }

    saveDraft() {
        cy.get('article.koenig-editor').click();
        this.screenshot();
    }

    clickPage(title) {
        this.getListTitlesPage().contains(title).click({ force: true });
        this.screenshot();
    }

    publishPage() {
        cy.get('section.view-actions .gh-publishmenu').click();
        this.screenshot();
        cy.get('button.gh-publishmenu-button').click();
        this.screenshot();
    }

    unPublishPage() {
        cy.get('section.view-actions .gh-publishmenu').click();
        this.screenshot();
        cy.get('.gh-publishmenu-radio-label').contains('Unpublished').click();
        this.screenshot();
        cy.get('button.gh-publishmenu-button').click();
        this.screenshot();
    }

    openPanelConfiguration() {
        cy.get('section.view-actions button.post-settings').click();
        this.screenshot();
    }

    setSlug(content) {
        this.getSlug().type(content);
    }

    clickDeleteButton() {
        cy.get('button.settings-menu-delete-button').click();
        this.screenshot();
    }

    confirmDelete() {
        cy.get('section.modal-content button').contains('Delete').click();
        this.screenshot();
    }

    getStatusPage(title) {
        return this.getListTitlesPage().contains(title, {force: true}).parent('a').parent('li');
    }

    getErrorMessageTitle() {
        return cy.get("article.gh-alert .gh-alert-content");
    }

    getSlug() {
        return cy.get('input[name="post-setting-slug"]');
    }

    closePanelConfiguration() {
        cy.get('div.content-cover').click();
    }

    setPublishDate(content) {
        this.getPublishDate().clear();
        this.getPublishDate().type(content);
    }

    getPublishDate() {
        return cy.get('.gh-date-time-picker .gh-date-time-picker-date input');
    }

    typeTag(content) {
        cy.get('#tag-input input').type(content);
    }

    clickAddNewTag() {
        cy.get('ul[role="listbox"] li').click();
    }

    getTags() {
        return cy.get('#tag-input ul li').click();
    }
}
