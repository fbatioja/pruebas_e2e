import { LoginPage } from "../support/PageObjects/LoginPage";
import {NavigationPage} from "../support/PageObjects/NavigationPage";

describe('Funcionalidad: Navigation', () => {
    const loginPage = new LoginPage();
    const navigationPage = new NavigationPage();
    const faker = require('faker');
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
            navigationPage.navigatePage();
        });
    });

    it('Escenario 1: Agregar item en el menu de navegacion', () => {
        navigationPage.setScenario('agregar_item_en_el_menu_de_navegacion');
        let label = faker.lorem.word();
        navigationPage.setLabelMenu1(label);
        navigationPage.clickButtonAddMenu1();
        navigationPage.clickSaveButton();
        cy.reload();
        navigationPage.getInputsLabelMenu1().eq(-2).scrollIntoView().should('have.value', label)
        navigationPage.resetIndexScreshot();
    });

    it('Escenario 2: Agregar item en el menu de navegacion secundario', () => {
        navigationPage.setScenario('agregar_item_en_el_menu_de_navegacion_secundario');
        let label = faker.lorem.word();
        navigationPage.setLabelMenu2(label);
        navigationPage.clickButtonAddMenu2();
        navigationPage.clickSaveButton();
        cy.reload();
        navigationPage.getInputsLabelMenu2().eq(-2).scrollIntoView().should('have.value', label);
    });

    it('Escenario 3: Ingresar URL sin formato menu 1', () => {
        navigationPage.setScenario('ingresar_url_sin_formato_menu_1');
        let label = faker.lorem.word();
        let badURL =  faker.internet.domainSuffix();
        navigationPage.setLabelMenu1(label);
        navigationPage.setUrlMenu1(badURL);
        navigationPage.clickButtonAddMenu1();
        navigationPage.getInputsUrlMenu1().eq(-2).should('not.have.value', badURL);
        navigationPage.resetIndexScreshot();
    });

    it('Escenario 4: Ingresar URL sin formato menu 2', () => {
        navigationPage.setScenario('ingresar_url_sin_formato_menu_2');
        let label = faker.lorem.word();
        let badURL =  faker.internet.domainSuffix();
        navigationPage.setLabelMenu2(label);
        navigationPage.setUrlMenu2(badURL);
        navigationPage.clickButtonAddMenu2();
        navigationPage.getInputsUrlMenu2().eq(-2).should('not.have.value', badURL);
        navigationPage.resetIndexScreshot();
    });

});
