# pruebas_e2e

## Integrantes del Equipo de Pruebas

- Carolina Casas, b.casas@uniandes.edu.co
- Fabian Batioja, f.batioja@uniandes.edu.co
- Santiago Ocampo, s.ocampor@uniandes.edu.co
- Daniel Quiceno, d.quicenoc@uniandes.edu.co

## Funcionalidades a probar

### 1. Creación de post

La creación de contenido de tipo publicación es una de las funcionalidades centrales de
Ghost. En esta característica es posible la construcción del post mediante texto plano,
herramientas primarias y herramientas embebidas.

### 2. Creación de página

La creación de páginas es otra de las funcionalidades centrales de Ghost. En esta
característica es posible la construcción de páginas adicionales en los módulos de
presentación mediante texto plano, herramientas primarias y herramientas embebidas.

### 3. Creación de tag

Las etiquetas o categorías asociadas a los posts, sirven como mecanismo de búsqueda,
organización y presentación de contenido. En esta característica es posible diligenciar el
formulario de registro de un nuevo tag.

### 4. Invitación de usuarios (staff)

La adición de nuevos miembros que participen de diferentes modos en la construcción,
publicación y gestión de contenido, es otra de las funcionalidades principales de la aplicación
bajo pruebas. En esta característica es posible diligenciar el formulario de invitación de nuevos
usuarios.

### 5. Diseño – sección navegación

La sección de diseño de navegación permite ordenar y referenciar las rutas asociadas a las
páginas creadas.

## Escenarios de Prueba

1. Crear un post y verificar la existencia del post en la lista de posts
2. Crear un post, publicarlo y verificar en la lista de post el estado del post
3. Crear un post, publicar el post, despublicarlo y verificar en la lista de post su estado
4. Crear un post y eliminarlo
5. Crear y visualizar un page en el listado.
6. Crear, publicar y verificar el estado en el listado de un page.
7. Despublicar y verificar el estado en el listado de un page.
8. Eliminar un page.
9. Crear un tag y verificar la existencia del tag en la lista de tags
10. Crear un tag, editarlo y verificar en la lista de tag la edición
11. Crear un tag y eliminarlo
12. Invitar un usuario como "Author" y verificar el estado de envío
13. Invitar un usuario como "Administrador" y verificar el estado de envío
14. Invitar un usuario duplicado y verificar el mensaje de error
15. Invitar un usuario con email inválido y verificar el mensaje de error
16. Invitar un usuario sin email y verificar el mensaje de error
17. Crear un nuevo item en el menú de navegación
18. Crear un nuevo item en el menú de navegación secundario
19. Intentar crear un nuevo item con una URL invalida
20. Intentar crear un nuevo item con una URL invalida en el menu secundario

## Pros y contras de resemble y backstop

Por favor dirijase al siguiente link para ver los pros y contras: [resemble-y-backstop](https://github.com/fbatioja/pruebas_e2e/wiki/Pros-y-contras-resemble-y-backstop)

## Instrucciones para ejecutar los escenarios en Cypress

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
La prueba con el anterior comando se realizo con un Mac configurado con los pasos descritos en el tutorial de [kraken](https://misovirtual.virtual.uniandes.edu.co/codelabs/kraken-testing-web/index.html#2). Si se encuentra en Ubuntu puede necesitar ejecutar los siguientes comandos:
```
bundle install --path vendor/bundle 
bundle install
```

Si presenta errores con la ejecución copie los archivos con los features que se encuentran en `kraken/feature/` y el archivo con los pasos que se encuentra en `kraken/feature/web/step_definitions/web_steps.rb` y péguelos en un proyecto funcional de kraken.


## Instrucciones para ejecutar la comparación en Backstop

### Instalación

Para la ejecución y generación del reporte VRT de los escenarios de pruebas, es necesario contar con una instalación global de [BackstopJS](http://garris.github.io/BackstopJS/) en su equipo.
Primero, verifique que cuente con una versión de Node.js de 12 en adelante.
Posteriormente ejecute el comando `npm install -g backstopjs` y aguarde a que se instalen todas las dependencias.


### Configuración

Para la generación del reporte pre-establecido en este proyecto, es necesario indicar la referencia de los archivos a comparar, descritos en el archivo `backstop.json`.
Para esto desde la terminal ubiquese en la carpeta `backstop/` que se encuentra dentro del repositorio y ejecute el siguiente comando:
```
backstop reference
```

### Pasos para la ejecutar el reporte backstop
1. Ejecutar Cypres para las pruebas 3.3.0, cambiando la versión en la variables de ambiente en `cypress.json` y el entorno en `fixture/environment.json` y posteriormente `cypress run` en la carpeta `cypress`.
2. Ejecutar Cypres para las pruebas 3.42.5, cambiando la versión en la variables de ambiente en `cypress.json` y el entorno en `fixture/environment.json` y posteriormente `cypress run` en la carpeta `cypress`.
3. Para ejecutarlo desde la terminal clone el repositorio y ubiquese en la carpeta `backstop/` que se encuentra dentro del repositorio y ejecute el siguiente comando:
```
backstop test
```
Esto realizará la comparación visual de entre las imágenes de referencia y las objetivo, posteriormente se generará un reporte en formato HTML.
Para visualizarlo, ubíquese en la carpeta `backstop/backstop_data/html_report` en el archivo `index.html` e interactúe con los resultados.

## Instrucciones para ejecutar la comparación en Resemble

### Pasos para la ejecutar el reporte resemble
1. Ejecutar Cypres para las pruebas 3.3.0, cambie la versión en la variables de ambiente en `cypress.json` y el entorno en `fixture/environment.json` y posteriormente `cypress run` en la carpeta `cypress`.
2. Ejecutar Cypres para las pruebas 3.42.5, cambie la versión en la variables de ambiente en `cypress.json` y el entorno en `fixture/environment.json` y posteriormente `cypress run` en la carpeta `cypress`.
3. Ingresar a la carpeta `report`
4. Ejecutar comando `npm install`
5. Ejecutar comando `node index.js`
