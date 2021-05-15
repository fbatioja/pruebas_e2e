import { LoginPage } from "../support/PageObjects/LoginPage";
import { PostPage } from "../support/PageObjects/PostPage";

describe('Funcionalidad: Posts', () => {
    const loginPage = new LoginPage();
    const pageObjectPage = new PostPage();
    beforeEach(()=>{
        cy.fixture('environment').then(function(data) {
            var loginUrl = '';
            if (data.url.endsWith('/')) {
                loginUrl = data.url + '#/signin';
            } else {
                loginUrl = data.url + '/#/signin';
            }
            cy.visit(loginUrl);
            cy.wait(1000);

            loginPage.login(data.email, data.password);
            pageObjectPage.navigatePost();
        });
    });

    context('Escenario 1: Crear un post  y listarlo', () => {
        let title = "nuevo post";
        it('Crear un post', () => {
            pageObjectPage.clickNewPostButton();
            pageObjectPage.setPostTitle(title);
            pageObjectPage.createDraft();
        });
        it('Listar post', () => {
            pageObjectPage.getListTitlesPosts().contains(title);
        });
    });
    context('Escenario 2: Crear un post y publicarlo', () => {
        let title = "nuevo post publicar";
        it('Crear un post', () => {
            pageObjectPage.clickNewPostButton();
            pageObjectPage.setPostTitle(title);
            pageObjectPage.createDraft();
        });
        it('Publicar post', () => {
            pageObjectPage.clickPost(title);
            pageObjectPage.publishPost();
            pageObjectPage.clickReturnPostLink();
            pageObjectPage.getStatusPost(title).contains('Published');
        });
    });
    context('Escenario 3: Crear un post, publicar post y despublicarlo', () => {
        let title = "nuevo post dedpublicar";
        it('Crear un post', () => {
            pageObjectPage.clickNewPostButton();
            pageObjectPage.setPostTitle(title);
            pageObjectPage.createDraft();
        });
        it('Publicar y despublicar post', () => {
            pageObjectPage.clickPost(title);
            pageObjectPage.publishPost();
            pageObjectPage.clickReturnPostLink();
            pageObjectPage.clickPost(title);
            pageObjectPage.unPublishPost();
            pageObjectPage.clickReturnPostLink();
            pageObjectPage.getStatusPost(title).contains('Draft');
        });
    });
    context('Escenario 4: Crear una post y eliminarlo', () => {
        let title = "nuevo post eliminar";
        it('Crear un post', () => {
            pageObjectPage.clickNewPostButton();
            pageObjectPage.setPostTitle(title);
            pageObjectPage.createDraft();
        });
        it('Eliminar post', () => {
            pageObjectPage.clickPost(title);
            pageObjectPage.openPanelConfiguration();
            pageObjectPage.clickDeleteButton();
            pageObjectPage.confirmDelete();
            pageObjectPage.getListTitlesPosts().contains(title).should('not.exist');
        });
    });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomString(length) {
    let possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,!@#$%^&*()";
    let textResult = "";
    for (var i = 0; i < length; i++) {
        textResult += possible.charAt(getRandomInt(1, possible.length));
    }
    return textResult;
}
