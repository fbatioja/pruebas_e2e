export class PostPage {

    navigatePost() {
        cy.get('.gh-nav-body .gh-nav-manage a[href="#/posts/"]').click();
    }

    clickNewPostButton() {
        return cy.get('section .view-actions a[href="#/editor/post/"]').click();
    }

    clickReturnPostLink() {
        return cy.get('.gh-editor-header a[href="#/posts/"]').click();
    }

    getListTitlesPosts() {
        return cy.get('ol.gh-list h3');
    }

    setPostTitle(title) {
        cy.get('textarea.gh-editor-title').type(title);
    }

    createDraft() {
        cy.get('article.koenig-editor').click();
    }

    clickPost(title) {
        this.getListTitlesPosts().contains(title).click({ force: true });
    }

    publishPost() {
        cy.get('section.view-actions .gh-publishmenu').click();
        cy.get('button.gh-publishmenu-button').click();
    }

    unPublishPost() {
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

    getStatusPost(title) {
        return this.getListTitlesPosts().contains(title, {force: true}).parent('a').parent('li');
    }
}
