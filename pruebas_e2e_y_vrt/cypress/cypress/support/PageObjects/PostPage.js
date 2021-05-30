export class PostPage {
    
    setScenario (scenario) {
        this.scenario = scenario;
    }

    screenshot() {
        let filename = Cypress.env('version_app') +'/' + this.scenario + '/' + Cypress.env('index_post')+'_post'
        cy.screenshot(filename);
        Cypress.env('index_post', Cypress.env('index_post')+1);
        cy.wait(1000);
    }

    resetIndexScreshot() {
        Cypress.env('index_post', 0);
    } 

    navigatePost() {
        cy.get('.gh-nav-body .gh-nav-manage a[href="#/posts/"]').click();
    }

    clickNewPostButton() {
        cy.get('section .view-actions a[href="#/editor/post/"]').click();
        this.screenshot();
    }

    clickReturnPostLink() {
        cy.get('.gh-editor-header a[href="#/posts/"]').click();
        this.screenshot();
    }

    getListTitlesPosts() {
        return cy.get('ol.gh-list h3');
    }

    setPostTitle(title) {
        cy.get('textarea.gh-editor-title').type(title);
        this.screenshot();
    }

    createDraft() {
        cy.get('article.koenig-editor').click();
        this.screenshot();
    }

    clickPost(title) {
        this.getListTitlesPosts().contains(title).click({ force: true });
        this.screenshot();
    }

    publishPost() {
        cy.get('section.view-actions .gh-publishmenu').click();
        this.screenshot();
        cy.get('button.gh-publishmenu-button').click();
        this.screenshot();
    }

    unPublishPost() {
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

    clickDeleteButton() {
        cy.get('button.settings-menu-delete-button').click();
        this.screenshot();
    }

    confirmDelete() {
        cy.get('section.modal-content button').contains('Delete').click();
    }

    getStatusPost(title) {
        return this.getListTitlesPosts().contains(title, {force: true}).parent('a').parent('li');
    }
}
