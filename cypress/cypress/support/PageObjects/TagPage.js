export class TagPage {

    navigateTag() {
        cy.get('.gh-nav-body .gh-nav-manage a[href="#/tags/"]').click();
    }

    clickNewTagButton() {
        return cy.get('section.view-actions a[href="#/tags/new/"]'  ).click();
    }

    clickReturnTagLink() {
        return cy.get('.gh-editor-header a[href="#/tags/"]').click();
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
    }

    clickTag(name) {
        this.getListNamesTags().contains(name).click({ force: true });
    }

    clickDeleteButton() {
        cy.contains('button', 'Delete tag').click();
    }

    confirmDelete() {
        cy.get('section.modal-content button').contains('Delete').click();
    }

    getStatusTag(name) {
        return this.getListNamesTags().contains(name, {force: true}).parent('a').parent('li');
    }
}
