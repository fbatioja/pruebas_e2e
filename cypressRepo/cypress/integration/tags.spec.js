import { LoginPage } from "../support/PageObjects/LoginPage";
import { TagPage } from "../support/PageObjects/TagPage";

describe('Funcionalidad: Tags', () => {
    const loginPage = new LoginPage();
    const pageObjectTag = new TagPage();
    const pseudoDataPool = loginPage.getPseudoDataPool('tag');
    const aprioriDataPool = require('../fixtures/tag.json');
    const faker = require('faker');
    const scenariosQuantity = 4;
    const featureIterations = 30;
    const scenarieIterations = Math.ceil(featureIterations / scenariosQuantity);

    pageObjectTag.resetIndexScreshot();
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
            pageObjectTag.navigateTag();
        });
    });

    context('Escenario 1: Crear un tag con titulo valido', () => {
        for (let index = 0; index < scenarieIterations; index++) {
            const item = aprioriDataPool[index];
            let name = item.name;
            let slug = faker.lorem.words(1);
            it('Crear un tag con titulo valido', () => {
                pageObjectTag.setScenario('crear_un_tag_con_titulo_valido');
                pageObjectTag.clickNewTagButton();
                pageObjectTag.setTagName(name);
                pageObjectTag.setTagSlug(slug);
                pageObjectTag.setTagDescription(item.description);
                pageObjectTag.clickSaveButton();
                pageObjectTag.navigateTag();
                pageObjectTag.getListNamesTags().contains(name);
                pageObjectTag.resetIndexScreshot();
            });
        }
    });

    context('Escenario 2: Crear un tag con titulo invalido', () => {
        for (let index = 0; index < scenarieIterations; index++) {
            const item = aprioriDataPool[index];
            let name = faker.lorem.words(50);
            let slug = faker.lorem.words(1);
            it('Crear un tag con titulo invalido', () => {
                pageObjectTag.setScenario('crear_un_tag_con_titulo invalido');
                pageObjectTag.clickNewTagButton();
                pageObjectTag.setTagName(name);
                pageObjectTag.setTagSlug(slug);
                pageObjectTag.setTagDescription(item.description);
                pageObjectTag.clickSaveButton();
                pageObjectTag.getErrorMessageName().contains("Tag names cannot be longer than 191 characters.");
                pageObjectTag.resetIndexScreshot();
            });
        }
    });

    context('Escenario 3: Crear un tag con slug invalido', () => {
        for (let index = 0; index < scenarieIterations; index++) {
            const item = aprioriDataPool[index];
            let name = faker.lorem.words(1);
            let slug = faker.lorem.words(50);
            it('Crear un tag con titulo invalido', () => {
                pageObjectTag.setScenario('crear_un_tag_con_titulo invalido');
                pageObjectTag.clickNewTagButton();
                pageObjectTag.setTagName(name);
                pageObjectTag.setTagSlug(slug);
                pageObjectTag.setTagDescription(item.description);
                pageObjectTag.clickSaveButton();
                cy.contains("Retry");
                // pageObjectPage.getErrorMessageRetry();
                pageObjectTag.resetIndexScreshot();
            });
        }
    });

    context('Escenario 4: Crear un tag, editarlo y verificar en la lista de tag la edición', () => {
        for (let index = 0; index < scenarieIterations; index++) {
            const item = aprioriDataPool[index];
            let name = faker.lorem.words(1);
            let slug = faker.lorem.words(1);
            // let name = getRandomString(8);
            it('Crear un tag', () => {
                pageObjectTag.setScenario('crear_tag_editarlo_y_listarlo');
                pageObjectTag.clickNewTagButton();
                pageObjectTag.setTagName(name);
                pageObjectTag.setTagSlug(slug);
                pageObjectTag.setTagDescription(item.description);
                pageObjectTag.clickSaveButton();
            });
        }
        for (let index = 0; index < scenarieIterations; index++){
            it('Editar tag', () => {
                const item = pseudoDataPool[index];
                // let editedName = faker.lorem.words(4);
                pageObjectTag.setScenario('crear_tag_editarlo_y_listarlo');
                pageObjectTag.clickTag(item.name);
                pageObjectTag.setTagName(item.name);
                pageObjectTag.clickSaveButton();
                pageObjectTag.navigateTag();  
                pageObjectTag.getListNamesTags().contains(item.name).should('exist');
                pageObjectTag.resetIndexScreshot();
            });
        }
    });
});



