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
        return cy.get('ol.gh-list h3').wait(3000);
    }

    setPostTitle(title) {
        cy.get('textarea.gh-editor-title').wait(3000).type(title).wait(3000);
    }

    createDraft() {
        cy.get('article.koenig-editor').wait(3000).click();
    }

    clickPost(title) {
        this.getListTitlesPosts().wait(3000).contains(title).click({ force: true });
    }

    publishPost() {
        cy.get('section.view-actions .gh-publishmenu').wait(3000).click();
        cy.get('button.gh-publishmenu-button').wait(3000).click();
    }

    unPublishPost() {
        cy.get('section.view-actions .gh-publishmenu').wait(3000).click();
        cy.get('.gh-publishmenu-radio-label').wait(3000).contains('Unpublished').click();
        cy.get('button.gh-publishmenu-button').wait(3000).click();
    }

    openPanelConfiguration() {
        cy.get('section.view-actions button.post-settings').wait(3000).click();
    }

    clickDeleteButton() {
        cy.get('button.settings-menu-delete-button').wait(3000).click();
    }

    confirmDelete() {
        cy.get('section.modal-content button').wait(3000).contains('Delete').click();
    }

    getStatusPost(title) {
        return this.getListTitlesPosts().wait(3000).contains(title, {force: true}).parent('a').parent('li');
    }
}
