import { LoginPage } from "../support/PageObjects/LoginPage";
import { TagPage } from "../support/PageObjects/TagPage";

describe('Funcionalidad: Tags', () => {
    const loginPage = new LoginPage();
    const tagPage = new TagPage();
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
            tagPage.navigateTag();
        });
    });

    context('Escenario 1: Crear un tag  y listarlo', () => {
        let name = getRandomString(8);
        it('Crear un tag', () => {
            tagPage.clickNewTagButton();
            tagPage.setTagName(name);
            tagPage.setTagSlug("slug");
            tagPage.setTagDescription("descriptions");
            tagPage.setTagMetaTitle("metatitle");
            tagPage.setTagMetaDescription("metadescription");
            tagPage.clickSaveButton();

        });
        it('Listar tag', () => {
            tagPage.getListNamesTags().contains(name);
        });
    });
 
    context('Escenario 2: Crear un tag, editarlo y verificar en la lista de tag la edición', () => {
        let name = getRandomString(8);
        it('Crear un tag', () => {
            tagPage.clickNewTagButton();
            tagPage.setTagName(name);
            tagPage.setTagSlug("slug");
            tagPage.setTagDescription("descriptions");
            tagPage.setTagMetaTitle("metatitle");
            tagPage.setTagMetaDescription("metadescription");
            tagPage.clickSaveButton();

        });
        it('Editar tag', () => {
            let editedName = "edited_name";
            tagPage.clickTag(name);
            tagPage.setTagName(editedName);
            tagPage.clickSaveButton();
            tagPage.navigateTag();  
            tagPage.getListNamesTags().contains(editedName).should('exist');          

        });
    });

    context('Escenario 3: Crear una tag y eliminarlo', () => {
        let name = getRandomString(8);
        it('Crear un tag', () => {
            tagPage.clickNewTagButton();
            tagPage.setTagName(name);
            tagPage.setTagSlug("slug");
            tagPage.setTagDescription("descriptions");
            tagPage.setTagMetaTitle("metatitle");
            tagPage.setTagMetaDescription("metadescription");
            tagPage.clickSaveButton();

        });
        it('Eliminar tag', () => {
            tagPage.clickTag(name);
            tagPage.clickDeleteButton();
            tagPage.confirmDelete();
            tagPage.navigateTag();
            tagPage.getListNamesTags().contains(name).should('not.exist');
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
