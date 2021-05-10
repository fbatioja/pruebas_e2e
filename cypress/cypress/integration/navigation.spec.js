import { LoginPage } from "../support/PageObjects/LoginPage";
import {NavigationPage} from "../support/PageObjects/NavigationPage";

describe('Funcionalidad: Pagina', () => {
    const loginPage = new LoginPage();
    const navigationPage = new NavigationPage();
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
        let label = getRandomString(5);
        navigationPage.setLabelMenu1(label);
        navigationPage.clickButtonAddMenu1();
        navigationPage.clickSaveButton();
        cy.reload();
        navigationPage.getInputsLabelMenu1().eq(-2).scrollIntoView().should('have.value', label)
    });

    it('Escenario 2: Agregar item en el menu de navegacion secundario', () => {
        let label = getRandomString(5);
        navigationPage.setLabelMenu2(label);
        navigationPage.clickButtonAddMenu2();
        navigationPage.clickSaveButton();
        cy.reload();
        navigationPage.getInputsLabelMenu2().eq(-2).scrollIntoView().should('have.value', label);
    });

    it('Escenario 3: Ingresar URL sin formato menu 1', () => {
        let label = getRandomString(5);
        let badURL =  'Url sin formato';
        navigationPage.setLabelMenu1(label);
        navigationPage.setUrlMenu1(badURL);
        navigationPage.clickButtonAddMenu1();
        navigationPage.getInputsUrlMenu1().eq(-2).should('not.have.value', badURL);
    });

    it('Escenario 4: Ingresar URL sin formato menu 2', () => {
        let label = getRandomString(5);
        let badURL =  'Url sin formato';
        navigationPage.setLabelMenu2(label);
        navigationPage.setUrlMenu2(badURL);
        navigationPage.clickButtonAddMenu2();
        navigationPage.getInputsUrlMenu2().eq(-2).should('not.have.value', badURL);
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
