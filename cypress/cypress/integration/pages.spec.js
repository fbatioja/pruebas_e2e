import { LoginPage } from "../support/PageObjects/LoginPage";
import { PagePage } from "../support/PageObjects/PagePage";

describe('Funcionalidad: Pagina', () => {
    const loginPage = new LoginPage();
    var pageObjectPage = new PagePage();
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
            pageObjectPage.navigatePage();
        });
    });

    context('Escenario 1: Crear una pagina y listarla', () => {
        let title = getRandomString(8);
        it('Crear una pagina', () => {
            pageObjectPage.setScenario('crear_una_pagina_y_listarla');
            pageObjectPage.clickNewPageButton();
            pageObjectPage.setPageTitle(title);
            pageObjectPage.createDraft();
        });
        it('Listar pagina', () => {
            pageObjectPage.setScenario('crear_una_pagina_y_listarla');
            pageObjectPage.getListTitlesPage().contains(title);
            pageObjectPage.resetIndexScreshot();
        });
    });
    context('Escenario 2: Crear una pagina y publicarla', () => {
        let title = getRandomString(8);
        it('Crear una pagina', () => {
            pageObjectPage.setScenario('crear_una_pagina_y_publicarla');
            pageObjectPage.clickNewPageButton();
            pageObjectPage.setPageTitle(title);
            pageObjectPage.createDraft();
        });
        it('Publicar pagina', () => {
            pageObjectPage.clickPage(title);
            pageObjectPage.publishPage();
            pageObjectPage.clickReturnPageLink();
            pageObjectPage.getStatusPage(title).contains('Published');
            pageObjectPage.resetIndexScreshot();
        });
    });
    context('Escenario 3: Crear una pagina y despublicarla', () => {
        let title = getRandomString(8);
        it('Crear una pagina', () => {
            pageObjectPage.setScenario('crear_una_pagina_y_despublicarla');
            pageObjectPage.clickNewPageButton();
            pageObjectPage.setPageTitle(title);
            pageObjectPage.createDraft();
        });
        it('Despublicar pagina', () => {
            pageObjectPage.setScenario('crear_una_pagina_y_despublicarla');
            pageObjectPage.clickPage(title);
            pageObjectPage.publishPage();
            pageObjectPage.clickReturnPageLink();
            pageObjectPage.clickPage(title);
            pageObjectPage.unPublishPage();
            pageObjectPage.clickReturnPageLink();
            pageObjectPage.getStatusPage(title).contains('Draft');
            pageObjectPage.resetIndexScreshot();
        });
    });
    context('Escenario 4: Crear una pagina y eliminarla', () => {
        let title = getRandomString(8);
        it('Crear una pagina', () => {
            pageObjectPage.setScenario('crear_una_pagina_y_eliminarla');
            pageObjectPage.clickNewPageButton();
            pageObjectPage.setPageTitle(title);
            pageObjectPage.createDraft();
        });
        it('Eliminar pagina', () => {
            pageObjectPage.setScenario('crear_una_pagina_y_eliminarla');
            pageObjectPage.clickPage(title);
            pageObjectPage.openPanelConfiguration();
            pageObjectPage.clickDeleteButton();
            pageObjectPage.confirmDelete();
            pageObjectPage.navigatePage();
            pageObjectPage.getListTitlesPage().contains(title).should('not.exist');
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
