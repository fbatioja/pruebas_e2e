# pruebas_e2e

## Integrantes del Equipo de Pruebas:
- Carolina Casas, b.casas@uniandes.edu.co
- Fabian Batioja, f.batioja@uniandes.edu.co
- Santiago Ocampo, s.ocampor@uniandes.edu.co
- Daniel Quiceno, d.quicenoc@uniandes.edu.co

## Funcionalidades a probar:
### 1. Creación de post:
La creación de contenido de tipo publicación es una de las funcionalidades centrales de
Ghost. En esta característica es posible la construcción del post mediante texto plano,
herramientas primarias y herramientas embebidas.
### 2. Creación de página:
La creación de páginas es otra de las funcionalidades centrales de Ghost. En esta
característica es posible la construcción de páginas adicionales en los módulos de
presentación mediante texto plano, herramientas primarias y herramientas embebidas.
### 3. Creación de tag:
Las etiquetas o categorías asociadas a los posts, sirven como mecanismo de búsqueda,
organización y presentación de contenido. En esta característica es posible diligenciar el
formulario de registro de un nuevo tag.
### 4. Invitación de usuarios (staff):
La adición de nuevos miembros que participen de diferentes modos en la construcción,
publicación y gestión de contenido, es otra de las funcionalidades principales de la aplicación
bajo pruebas. En esta característica es posible diligenciar el formulario de invitación de nuevos
usuarios.
### 5. Diseño – sección navegación:
La sección de diseño de navegación permite ordenar y referenciar las rutas asociadas a las
páginas creadas.

## Escenarios de Prueba:
1. Crear un post y verificar la existencia del post en la lista de posts
2. Crear un post, publicarlo y verificar en la lista de post el estado del post
3. Crear un post, publicar el post, despublicarlo y verificar en la lista de post su estado
4. Crear un post y eliminarlo 
5. Crear y visualizar un page en el listado.
6. Crear, publicar y verificar el estado en el listado de un page.
7. Despublicar y verificar el estado en el listado de un page.
8. Eliminar un page.
9. x
10. x
11. x
12. x
13. Invitar un usuario como "Author" y verificar el estado de envío
14. Invitar un usuario como "Administrador" y verificar el estado de envío
15. Invitar un usuario duplicado y verificar el mensaje de error
16. Invitar un usuario con email inválido y verificar el mensaje de error
17. Invitar un usuario sin email y verificar el mensaje de error
18. Crear un nuevo item en el menú de navegación
19. Crear un nuevo item en el menú de navegación secundario
20. Intentar crear un nuevo item con una URL invalida
21. Intentar crear un nuevo item con una URL invalida en el menu secundario

## Instrucciones para ejecutar los escenarios en Cypress:
### Instalación
Para la ejecución de los escenarios de pruebas es necesario contar con una instalación global de cypress en su equipo.
Primero, verifique que cuente con una versión de Node.js de 12 en adelante.
Posteriormente ejecute el comando `npm install cypress` y aguarde a que se instalen todas las dependencias.

Si desea realizar la instalación por contenedores de docker, le recomendamos seguir las instrucciones de la documentación oficial de [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress).

### Configuración
Se debe configurar un usuario administrador y la url del sitio de ghost en el cual se van a ejecutar las pruebas. Esta configuración se realiza en `cypress/fixtures/environment.json` como se muestra en el siguiente ejemplo:
```
{
  "email": "admin@test.com",
  "password": "1a2B3c4D,F",
  "url": "http://localhost:2370/ghost"
}
```
### Ejecución de los escenarios
Para ejecutarlo desde la terminal clone el repositorio y ubiquese en la carpeta `cypress/` que se encuentra dentro del repositorio y ejecute el siguiente comando:
```
cypress run
```
Puede ejecutarlo también desde la interfaz gráfica de cypress, para esto ejecute el comando `cypress open` y seleccione la carpeta `cypress/` que se encuentra dentro del repositorio.

## Instrucciones para ejecutar los escenarios en Kraken:
### Configuración
Se debe configurar un usuario administrador y la url del sitio de ghost en el cual se van a ejecutar las pruebas. Esta configuración se realiza en `kraken/feature/web/step_definitions/web_steps.rb`. Debe modificar las variables `$email`, `$password` y `$url`.
```
  Then(/^I login in ghost as admin$/) do
    $email = 'admin@test.com'
    $password = '1a2B3c4D,F'
    $url = 'http://localhost:2370/ghost/'
    @driver.navigate.to $url
      sleep 2
    @driver.find_element(:css, 'input[name="identification"]').send_keys($email)
    @driver.find_element(:css, 'input[name="password"]').send_keys($password)
    @driver.find_element(:css, '#login button[type="submit"]').click
      sleep 2
  end
```
### Ejecución de los escenarios
Para ejecutarlo desde la terminal clone el repositorio y ubiquese en la carpeta `kraken/` que se encuentra dentro del repositorio y ejecute el siguiente comando:
```
bundle exec kraken-mobile run
```
La prueba con el anterior comando se realizo con un Mac configurado con los pasos descritos en el tutorial https://misovirtual.virtual.uniandes.edu.co/codelabs/kraken-testing-web/index.html#2. Si se encuentra en Ubuntu puede necesitar ejecutar `bundle install --path vendor/bundle` y `bundle install`.

Si presenta errores con la ejecución copie los archivos con los features que se encuentran en `kraken/feature/` y el archivo con los pasos que se encuentra en `kraken/feature/web/step_definitions/web_steps.rb` y péguelos en un proyecto funcional de kraken.
