export class LoginPage {
  login(email, password) {
    cy.get('input[name="identification"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('#login button[type="submit"]').click();
  }

  getAprioriDataPool(dataPoolName) {
    let dataPool = {};
    cy.fixture(dataPoolName).then(function(data) {
      dataPool = data;
    });
    return dataPool;
  }

  getPseudoDataPool(dataPoolName) {
    let dataPool = {};
    let mockarooApiKey = 'd8e87be0';
    let url = `https://my.api.mockaroo.com/${dataPoolName}.json?key=${mockarooApiKey}`;
    $.ajax({
      async: false,
      url: url,
      responseType:'application/json',
      success: function(data) {
        dataPool = data;
      },
      error: function(xhr, status, error) {
        console.log(`Hubo un error al leer el archivo:\n${error}`);
      }
    });
    return dataPool;
  }
}
