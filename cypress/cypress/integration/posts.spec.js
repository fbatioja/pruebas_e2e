import { LoginPage } from "../support/PageObjects/LoginPage";
import { PostPage } from "../support/PageObjects/PostPage";

describe('Funcionalidad: Posts', () => {
    const loginPage = new LoginPage();
    const pageObjectPage = new PostPage();
    pageObjectPage.resetIndexScreshot();
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
            pageObjectPage.setScenario('Crear_un post_y_listarlo');
            pageObjectPage.clickNewPostButton();
            pageObjectPage.setPostTitle(title);
            pageObjectPage.createDraft();
        });
        it('Listar post', () => {
            pageObjectPage.setScenario('Crear_un post_y_listarlo');
            pageObjectPage.getListTitlesPosts().contains(title);
            pageObjectPage.resetIndexScreshot();
        });
    });
    context('Escenario 2: Crear un post y publicarlo', () => {
        let title =  getRandomString(8);
        it('Crear un post', () => {
            pageObjectPage.setScenario('Crear_un post_y_publicarlo');
            pageObjectPage.clickNewPostButton();
            pageObjectPage.setPostTitle(title);
            pageObjectPage.createDraft();
        });
        it('Publicar post', () => {
            pageObjectPage.setScenario('Crear_un post_y_publicarlo');
            pageObjectPage.clickPost(title);
            pageObjectPage.publishPost();
            pageObjectPage.clickReturnPostLink();
            pageObjectPage.getStatusPost(title).contains('Published');
            pageObjectPage.resetIndexScreshot();
        });
    });
    context('Escenario 3: Crear un post, publicar post y despublicarlo', () => {
        let title =  getRandomString(8);
        it('Crear un post', () => {
            pageObjectPage.setScenario('Crear_un post_publicarlo_despublicarlo');
            pageObjectPage.clickNewPostButton();
            pageObjectPage.setPostTitle(title);
            pageObjectPage.createDraft();
        });
        it('Publicar y despublicar post', () => {
            pageObjectPage.setScenario('Crear_un post_publicarlo_despublicarlo');
            pageObjectPage.clickPost(title);
            pageObjectPage.publishPost();
            pageObjectPage.clickReturnPostLink();
            pageObjectPage.clickPost(title);
            pageObjectPage.unPublishPost();
            pageObjectPage.clickReturnPostLink();
            pageObjectPage.getStatusPost(title).contains('Draft');
            pageObjectPage.resetIndexScreshot();
        });
    });
    context('Escenario 4: Crear una post y eliminarlo', () => {
        let title =  getRandomString(8);
        it('Crear un post', () => {
            pageObjectPage.setScenario('Crear_un post_y_eliminarlo');
            pageObjectPage.clickNewPostButton();
            pageObjectPage.setPostTitle(title);
            pageObjectPage.createDraft();
        });
        it('Eliminar post', () => {
            pageObjectPage.setScenario('Crear_un post_y_eliminarlo');
            pageObjectPage.clickPost(title);
            pageObjectPage.openPanelConfiguration();
            pageObjectPage.clickDeleteButton();
            pageObjectPage.confirmDelete();
            pageObjectPage.getListTitlesPosts().contains(title).should('not.exist');
            pageObjectPage.resetIndexScreshot();
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
