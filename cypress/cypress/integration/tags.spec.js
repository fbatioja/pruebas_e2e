import { LoginPage } from "../support/PageObjects/LoginPage";
import { TagPage } from "../support/PageObjects/TagPage";

describe('Funcionalidad: Tags', () => {
    const loginPage = new LoginPage();
    const pageObjectTag = new TagPage();
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

    context('Escenario 1: Crear un tag  y listarlo', () => {
        let name = getRandomString(8);
        it('Crear un tag', () => {
            pageObjectTag.setScenario('crear_tag_y_listarlo');
            pageObjectTag.clickNewTagButton();
            pageObjectTag.setTagName(name);
            pageObjectTag.setTagSlug("slug");
            pageObjectTag.setTagDescription("descriptions");
            // pageObjectTag.setTagMetaTitle("metatitle");
            // pageObjectTag.setTagMetaDescription("metadescription");
            pageObjectTag.clickSaveButton();
        });
        it('Listar tag', () => {
            pageObjectTag.setScenario('crear_tag_y_listarlo');
            pageObjectTag.getListNamesTags().contains(name);
            pageObjectTag.resetIndexScreshot();
        });
    });

    context('Escenario 2: Crear un tag, editarlo y verificar en la lista de tag la edición', () => {
        let name = getRandomString(8);
        it('Crear un tag', () => {
            pageObjectTag.setScenario('crear_tag_editarlo_y_listarlo');
            pageObjectTag.clickNewTagButton();
            pageObjectTag.setTagName(name);
            pageObjectTag.setTagSlug("slug");
            pageObjectTag.setTagDescription("descriptions");
            // pageObjectTag.setTagMetaTitle("metatitle");
            // pageObjectTag.setTagMetaDescription("metadescription");
            pageObjectTag.clickSaveButton();
        });
        it('Editar tag', () => {
            let editedName = "edited_name";
            pageObjectTag.setScenario('crear_tag_editarlo_y_listarlo');
            pageObjectTag.clickTag(name);
            pageObjectTag.setTagName(editedName);
            pageObjectTag.clickSaveButton();
            pageObjectTag.navigateTag();  
            pageObjectTag.getListNamesTags().contains(editedName).should('exist');
            pageObjectTag.resetIndexScreshot();
        });
    });

    context('Escenario 3: Crear una tag y eliminarlo', () => {
        let name = getRandomString(8);
        it('Crear un tag', () => {
            pageObjectTag.setScenario('crear_tag_y_eliminarlo');
            pageObjectTag.clickNewTagButton();
            pageObjectTag.setTagName(name);
            pageObjectTag.setTagSlug("slug");
            pageObjectTag.setTagDescription("descriptions");
            // pageObjectTag.setTagMetaTitle("metatitle");
            // pageObjectTag.setTagMetaDescription("metadescription");
            pageObjectTag.clickSaveButton();
            pageObjectTag.resetIndexScreshot();
        });
        it('Eliminar tag', () => {
            pageObjectTag.setScenario('crear_tag_y_eliminarlo');
            pageObjectTag.clickTag(name);
            pageObjectTag.clickDeleteButton();
            pageObjectTag.confirmDelete();
            pageObjectTag.navigateTag();
            pageObjectTag.getListNamesTags().contains(name).should('not.exist');
            pageObjectTag.resetIndexScreshot();
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
