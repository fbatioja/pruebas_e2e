export class PagePage {

    navigatePage() {
        cy.get('.gh-nav-body .gh-nav-manage a[href="#/pages/"]').click();
    }

    clickNewPageButton() {
        return cy.get('section .view-actions a[href="#/editor/page/"]').click();
    }

    clickReturnPageLink() {
        return cy.get('.gh-editor-header a[href="#/pages/"]').click();
    }

    getListTitlesPage() {
        return cy.get('ol.gh-list h3');
    }

    setPageTitle(title) {
        cy.get('textarea.gh-editor-title').type(title);
    }

    createDraft() {
        cy.get('article.koenig-editor').click();
    }

    clickPage(title) {
        this.getListTitlesPage().contains(title).click({ force: true });
    }

    publishPage() {
        cy.get('section.view-actions .gh-publishmenu').click();
        cy.get('button.gh-publishmenu-button').click();
    }

    unPublishPage() {
        cy.get('section.view-actions .gh-publishmenu').click();
        cy.get('.gh-publishmenu-radio-label').contains('Unpublished').click();
        cy.get('button.gh-publishmenu-button').click();
    }

    openPanelConfiguration() {
        cy.get('section.view-actions button.post-settings').click();
    }

    clickDeleteButton() {
        cy.get('button.settings-menu-delete-button').click();
    }

    confirmDelete() {
        cy.get('section.modal-content button').contains('Delete').click();
    }

    getStatusPage(title) {
        return this.getListTitlesPage().contains(title, {force: true}).parent('a').parent('li');
    }
}
