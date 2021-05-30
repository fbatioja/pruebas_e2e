import { LoginPage } from "../support/PageObjects/LoginPage";
import { PostPage } from "../support/PageObjects/PostPage";

describe('Funcionalidad: Posts', () => {
    const loginPage = new LoginPage();
    const pageObjectPage = new PostPage();
    pageObjectPage.resetIndexScreshot();
    const pseudoDataPool = loginPage.getPseudoDataPool('element');
    const aprioriDataPool = require('../fixtures/element.json');
    const faker = require('faker');
    const scenariosQuantity = 3;
    const featureIterations = 30;
    const scenarieIterations = Math.ceil(featureIterations / scenariosQuantity);

    beforeEach(() => {
        cy.fixture('environment').then(function (data) {
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

    /**
    * Dynamyc Random (pseduo) data pool
    */
    context('Escenario 1: Crear un post con titulo valido', () => {
        for (let index = 0; index < scenarieIterations; index++) {
            let title = pseudoDataPool[index].title;
            it('Crear un post', () => {
                pageObjectPage.setScenario('Crear_un post_con titulo valido');
                pageObjectPage.clickNewPostButton();
                pageObjectPage.setPostTitle(title);
                pageObjectPage.createDraft();
                pageObjectPage.clickReturnPostLink();
                pageObjectPage.getListTitlesPosts().contains(title);
                pageObjectPage.resetIndexScreshot();
            });
        }
    });

    /**
    * Random data
    * BUG: Al ingresar el title mayor a 255 caracteres sin salir del input hasta terminar de escribir, nunca aparece el boton publihsh y el usuario no puede publicar y no le dice porque
    */
    context('Escenario 2: Crear un post con titulo mayor a 255 caracteres', () => {
        for (let index = 0; index < scenarieIterations; index++) {
            let title = faker.lorem.words(100);
            it('Crear un post', () => {
                pageObjectPage.setScenario('Crear un post con titulo mayor a 255 caracteres');
                pageObjectPage.clickNewPostButton();
                pageObjectPage.setPostTitle(getRandomString(1));
                pageObjectPage.createDraft();
                pageObjectPage.setPostTitle(title);
                pageObjectPage.publishPost();
                pageObjectPage.getErrorMessageTitle().contains("Title cannot be longer than 255 characters");
                pageObjectPage.resetIndexScreshot();
            });
        }
    });

    /**
    * Apriori Data Pool
    * BUG: si el titulo del post es una sola palabra sin espacios, en lista de post se desborda el tezto y se desaparece las columnas de SEND
    */
    context('Escenario 3: Crear un post con titulo valido y publicarlo', () => {
        for (let index = 0; index < scenarieIterations; index++) {
            let title = aprioriDataPool[index].title;
            it('Crear un post', () => {
                pageObjectPage.setScenario('Crear_un post_con titulo valido y publicarlo');
                pageObjectPage.clickNewPostButton();
                pageObjectPage.setPostTitle(title);
                pageObjectPage.createDraft();
                pageObjectPage.clickPost(title);
                pageObjectPage.publishPost();
                pageObjectPage.clickReturnPostLink();
                pageObjectPage.getStatusPost(title).contains('Published');
                pageObjectPage.resetIndexScreshot();
            });
        }
    });

    /**
    * Random Data
    */
     context('Escenario 3: Crear un post con titulo invalido y publicarlo', () => {
        for (let index = 0; index < scenarieIterations; index++) {
            let title = faker.lorem.words(250);
            it('Crear un post', () => {
                pageObjectPage.setScenario('Crear_un post_con titulo invalido y publicarlo');
                pageObjectPage.clickNewPostButton();
                pageObjectPage.setPostTitle("a");
                pageObjectPage.createDraft();
                pageObjectPage.setPostTitle(title);
                pageObjectPage.publishPost();
                pageObjectPage.clickReturnPostLink();
                pageObjectPage.getStatusPost("a"+title).contains('Published');
                pageObjectPage.resetIndexScreshot();
            });
        }
    });



    /**
    * Random data
    */
    context('Escenario 4: Crear una post con titulo menor a 50 caracteres y eliminarlo', () => {
        for (let index = 0; index < scenarieIterations; index++) {
            let title = faker.lorem.words(6);
            it('Crear un post', () => {
                pageObjectPage.setScenario('Crear_un post_y_eliminarlo');
                pageObjectPage.clickNewPostButton();
                pageObjectPage.setPostTitle(title);
                pageObjectPage.createDraft();
                pageObjectPage.clickPost(title);
                pageObjectPage.openPanelConfiguration();
                pageObjectPage.clickDeleteButton();
                pageObjectPage.confirmDelete();
                pageObjectPage.getListTitlesPosts().contains(title).should('not.exist');
                pageObjectPage.resetIndexScreshot();
            });
        }
    });

    /**
    * Randon Data
    * BUG: En el mensaje de confirmacion de eliminacion el nombre del post se desborda
    */
    context('Escenario 5: Crear una post con titulo mayor a 50 caracteres y eliminarlo', () => {
        for (let index = 0; index < scenarieIterations; index++) {
            let title = faker.lorem.words(50);
            it('Crear un post', () => {
                pageObjectPage.setScenario('Crear_un post_y_eliminarlo');
                pageObjectPage.clickNewPostButton();
                pageObjectPage.setPostTitle(title);
                pageObjectPage.createDraft();
                pageObjectPage.clickPost(title);
                pageObjectPage.openPanelConfiguration();
                pageObjectPage.clickDeleteButton();
                pageObjectPage.confirmDelete();
                pageObjectPage.getListTitlesPosts().contains(title).should('not.exist');
                pageObjectPage.resetIndexScreshot();
            });
        }
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
