# pruebas_e2e

## Integrantes del Equipo de Pruebas

- Carolina Casas, b.casas@uniandes.edu.co
- Fabian Batioja, f.batioja@uniandes.edu.co
- Santiago Ocampo, s.ocampor@uniandes.edu.co
- Daniel Quiceno, d.quicenoc@uniandes.edu.co

## Estrategia de pruebas

En el siguiente enlace encontrará la estrategia de pruebas. Al final de la estrategia se encuentra el enlace al video 
https://github.com/fbatioja/pruebas_e2e/blob/main/Estrategia%20de%20pruebas.pdf

## Pruebas manuales
En el siguiente enlace encontrara el inventario de las pruebas manuales.
https://github.com/fbatioja/pruebas_e2e/blob/main/inventario-pruebas-exploratorias.xlsx

## Pruebas e2e y vrt
Las pruebas e2e y vrt se encuentran en la carpeta `pruebas_e2e_y_vrt`. A continuación se muestran los escenarios probados y se explica como ejecutarlas.

### Escenarios de Prueba

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

### Instrucciones para ejecutar las pruebas e2e en Cypress

#### Instalación
Para la ejecución de los escenarios de pruebas es necesario contar con una instalación global de cypress en su equipo.
Primero, verifique que cuente con una versión de Node.js de 12 en adelante.
Posteriormente ejecute el comando `npm install cypress` y aguarde a que se instalen todas las dependencias.

Si desea realizar la instalación por contenedores de docker, le recomendamos seguir las instrucciones de la documentación oficial de [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress).

#### Configuración
Se debe configurar un usuario administrador y la url del sitio de ghost en el cual se van a ejecutar las pruebas. Esta configuración se realiza en `cypress/fixtures/environment.json` como se muestra en el siguiente ejemplo:
```
{
  "email": "admin@test.com",
  "password": "1a2B3c4D,F",
  "url": "http://localhost:2370/ghost"
}
```

Para ejecutarlo desde la terminal clone el repositorio y ubiquese en la carpeta `pruebas_e2e_y_vrt/cypress/` que se encuentra dentro del repositorio y ejecute el siguiente comando:
```
cypress run
```
Puede ejecutarlo también desde la interfaz gráfica de cypress, para esto ejecute el comando `cypress open` y seleccione la carpeta `pruebas_e2e_y_vrt/cypress/` que se encuentra dentro del repositorio.

### Instrucciones para ejecutar los escenarios en Kraken

#### Configuración

Se debe configurar un usuario administrador y la url del sitio de ghost en el cual se van a ejecutar las pruebas. Esta configuración se realiza en `pruebas_e2e_y_vrt/kraken/feature/web/step_definitions/web_steps.rb`. Debe modificar las variables `$email`, `$password` y `$url`.
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

#### Ejecución de los escenarios en Kraken utilizando la máquina virtual de Ubuntu
Nota: Pra la ejecución de los escenarios de Kraken se requiere utilizar la resolución de pantalla fullscreen, para ello se debe instalar un componente en la maquina virtual, explicado a continuación:
1. Abrir VirtualBox y correr la máquina virtual de Ubuntu. Iniciar sesión con usuario con permisos de Administrador
2. Dar Click en el icono "Dash" en la parte superior del menu a la izquierda de la pantalla. Escribir "Terminal" en la barra de buscador. Correr la aplicación de "Terminal" desde los resultados del buscador.
3. Escribir en el "Terminal": `sudo apt-get install virtualbox-guest-dmks` y presionar "Enter". Esperar hasta finalizar la instalación. La funcionalidad de ajustar tamaño de pantalla estará activada
4. Reiniciar Maquina Virtual
5. Ejecutar pruebas desde la terminal clonando el repositorio y ubicádose en la carpeta `pruebas_e2e_y_vrt/kraken/` que se encuentra dentro del repositorio, ejecutando el siguiente comando:

```
bundle exec kraken-mobile run
```
La prueba con el anterior comando se realizo con un Mac configurado con los pasos descritos en el tutorial de [kraken](https://misovirtual.virtual.uniandes.edu.co/codelabs/kraken-testing-web/index.html#2). Si se encuentra en Ubuntu puede necesitar ejecutar los siguientes comandos:
```
bundle install --path vendor/bundle 
bundle install
```

### Instrucciones para ejecutar la comparación en Backstop

#### Instalación
Para la ejecución y generación del reporte VRT de los escenarios de pruebas, es necesario contar con una instalación global de [BackstopJS](http://garris.github.io/BackstopJS/) en su equipo.
Primero, verifique que cuente con una versión de Node.js de 12 en adelante.
Posteriormente ejecute el comando `npm install -g backstopjs` y aguarde a que se instalen todas las dependencias.

#### Configuración
Para la generación del reporte pre-establecido en este proyecto, es necesario indicar la referencia de los archivos a comparar, descritos en el archivo `backstop.json`.

#### Pasos para la ejecutar el reporte backstop
1. Ejecutar Cypress para las pruebas 3.3.0, cambiando la versión en la variables de ambiente en `cypress.json` y el entorno en `pruebas_e2e_y_vrt/cypress/cypress/fixture/environment.json` y posteriormente `cypress run` en la carpeta `cypress`.
2. Ejecutar Cypress para las pruebas 3.42.5, cambiando la versión en la variables de ambiente en `cypress.json` y el entorno en `pruebas_e2e_y_vrt/cypress/cypress/fixture/environment.json` y posteriormente `cypress run` en la carpeta `cypress`.
3. Para ejecutarlo desde la terminal clone el repositorio y ubiquese en la carpeta `pruebas_e2e_y_vrt/backstop/` que se encuentra dentro del repositorio y ejecute el siguiente comando:
```
backstop reference
backstop test
```
Esto realizará la comparación visual de entre las imágenes de referencia y las objetivo, posteriormente se generará un reporte en formato HTML.
Para visualizarlo, ubíquese en la carpeta `pruebas_e2e_y_vrt/backstop/backstop_data/html_report` en el archivo `index.html` e interactúe con los resultados.

### Instrucciones para ejecutar la comparación en Resemble
#### Pasos para la ejecutar el reporte resemble
1. Ejecutar Cypres para las pruebas 3.3.0, cambie la versión en la variables de ambiente en `pruebas_e2e_y_vrt/cypress/cypress/cypress.json` por el valor `3.3.0` y el entorno en `pruebas_e2e_y_vrt/cypress/cypress/fixture/environment.json` y posteriormente `cypress run` en la carpeta `cypress`.
2. Ejecutar Cypres para las pruebas 3.42.5, cambie la versión en la variables de ambiente en `pruebas_e2e_y_vrt/cypress/cypress/cypress.json` por el valor `3.42.5` y el entorno en `pruebas_e2e_y_vrt/cypress/cypress/fixture/environment.json` y posteriormente `cypress run` en la carpeta `cypress`.
3. Ingresar a la carpeta `report`
4. Ejecutar comando `npm install`
5. Ejecutar comando `node index.js`

## Pruebas de validación de datos
Las pruebas de validación de datos se encuentran en la carpeta `validacion_datos`. A continuación se explica como ejecutarlas. 

### Instalación

Para la ejecución de los escenarios de pruebas debe clonar el repositorio, ubicarse en la carpeta `validacion_datos/` y ejecutar el siguiente comando:
```
npm install
```

### Configuración

Se debe configurar un usuario administrador y la url del sitio de ghost en el cual se van a ejecutar las pruebas. Esta configuración se realiza en `validacion_datos/cypress/fixtures/environment.json` como se muestra en el siguiente ejemplo:
```
{
  "email": "admin@test.com",
  "password": "1a2B3c4D,F",
  "url": "http://localhost:2370/ghost"
}
```

### Ejecución

Para ejecutarlo desde la terminal ubiquese en la carpeta `cypressRepo/` que se encuentra dentro del repositorio y ejecute el siguiente comando:
```
./node_modules/.bin/cypress run
```
O con el acceso directo usando npm bin
```
$(npm bin)/cypress run
```
O utilizando npx
```
npx cypress run
```
Puede ejecutarlo también desde la interfaz gráfica de cypress, para esto ejecute el comando `$(npm bin)/cypress open` y seleccione la carpeta `cypressRepo/` que se encuentra dentro del repositorio.
