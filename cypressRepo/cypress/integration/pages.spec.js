import { LoginPage } from "../support/PageObjects/LoginPage";
import { PagePage } from "../support/PageObjects/PagePage";


describe('Funcionalidad: Pagina', () => {
    const loginPage = new LoginPage();
    const pageObjectPage = new PagePage();
    const pseudoDataPool = loginPage.getPseudoDataPool('element');
    const aprioriDataPool = require('../fixtures/element.json');
    const faker = require('faker');
    const scenariosQuantity = 3;
    const featureIterations = 30;
    const scenarieIterations = Math.ceil(featureIterations / scenariosQuantity);
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

    context(`Escenario 1: Crear una pagina con titulo valido`, () => {
        for (let index = 0; index < scenarieIterations; index++) {
            const item = aprioriDataPool[index];
            let title = item.title;
            it('Crear una pagina con titulo valido', () => {
                pageObjectPage.setScenario('Crear_una_pagina_con_titulo_valido');
                pageObjectPage.clickNewPageButton();
                pageObjectPage.setPageTitle(title);
                pageObjectPage.saveDraft();
                pageObjectPage.clickReturnPageLink();
                pageObjectPage.getListTitlesPage().contains(title);
                pageObjectPage.resetIndexScreshot();
            });
        }
    });

    context(`Escenario 2: Crear una pagina con titulo invalido`, () => {
        for (let index = 0; index < scenarieIterations; index++) {
            let title = faker.lorem.words(100);
            it('Crear una pagina con titulo invalido', () => {
                pageObjectPage.setScenario('crear_una_pagina_con_titulo_invalido');
                pageObjectPage.clickNewPageButton();
                pageObjectPage.setPageTitle(faker.lorem.words(1));
                pageObjectPage.saveDraft();
                pageObjectPage.setPageTitle(title);
                pageObjectPage.publishPage();
                pageObjectPage.getErrorMessageTitle().contains("Title cannot be longer than 255 characters");
                pageObjectPage.resetIndexScreshot();
            });
        }
    });

    context(`Escenario 3: Crear una pagina con slug invalido`, () => {
        for (let index = 0; index < scenarieIterations; index++) {
            const item = pseudoDataPool[index];
            let title = faker.lorem.words(100);
            it('Crear una pagina con slug invalido', () => {
                pageObjectPage.setScenario('crear_una_pagina_con_slug_invalido');
                pageObjectPage.clickNewPageButton();
                pageObjectPage.setPageTitle(faker.lorem.words(1));
                pageObjectPage.saveDraft();
                pageObjectPage.openPanelConfiguration();
                pageObjectPage.setSlug(item.invalid_content);
                pageObjectPage.closePanelConfiguration();
                pageObjectPage.openPanelConfiguration();
                pageObjectPage.getSlug().should('not.have.value', item.invalid_content);
                pageObjectPage.resetIndexScreshot();
            });
        }
    });

    context(`Escenario 4: La fecha de publicacion no deberia estar en el pasado`, () => {
        for (let index = 0; index < 3; index++) {
            const item = pseudoDataPool[index];
            it('La fecha de publicacion no deberia estar en el pasado', () => {
                pageObjectPage.setScenario('la_fecha_de_publicacion_no_deberia_estar_en_el_pasado');
                pageObjectPage.clickNewPageButton();
                pageObjectPage.setPageTitle(faker.lorem.words(1));
                pageObjectPage.saveDraft();
                pageObjectPage.openPanelConfiguration();
                pageObjectPage.setPublishDate(item.invalid_publish_date);
                pageObjectPage.closePanelConfiguration();
                pageObjectPage.openPanelConfiguration();
                pageObjectPage.getPublishDate().should('not.have.value', item.invalid_publish_date);
                pageObjectPage.resetIndexScreshot();
            });
        }
    });

    context(`Escenario 5: Titulo en una pagina no deberian permitir caracteres especiales`, () => {
        for (let index = 0; index < 3; index++) {
            const item = aprioriDataPool[index];
            it('Titulo en una pagina no deberian permitir caracteres especiales', () => {
                pageObjectPage.setScenario('titulo_en_una_pagina_no_deberian_permitir_caracteres_especiales');
                pageObjectPage.clickNewPageButton();
                pageObjectPage.setPageTitle(item.invalid_content);
                pageObjectPage.saveDraft();
                pageObjectPage.clickReturnPageLink();
                pageObjectPage.getListTitlesPage().should('not.contain', item.invalid_content);
                pageObjectPage.resetIndexScreshot();
            });
        }
    });

    context(`Escenario 6: Tags caracteres especiales`, () => {
        for (let index = 0; index < 3; index++) {
            const item = pseudoDataPool[index];
            it('Tags caracteres especiales', () => {
                pageObjectPage.setScenario('tags_caracteres_especiales');
                pageObjectPage.clickNewPageButton();
                pageObjectPage.setPageTitle(faker.lorem.word());
                pageObjectPage.saveDraft();
                pageObjectPage.openPanelConfiguration();
                pageObjectPage.typeTag(item.invalid_tags);
                pageObjectPage.clickAddNewTag();
                pageObjectPage.getTags().contains(item.invalid_tags);
                pageObjectPage.resetIndexScreshot();
            });
        }
    });
});
