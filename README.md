# service-hub
Aplicacion que permite a profesionales mostrar sus servicios para ser contratados por terceros

# Project Structure

## Intermediate Folder Structure

![image](https://github.com/fedeferreyra98/service-hub/assets/65661381/6373fb8d-32f9-4621-827c-35afac4349ea)

Como puedes observar en la imagen anterior, esta estructura de carpetas incluye muchas más carpetas, cubriendo prácticamente cualquier tipo de archivo que puedas imaginar en un proyecto React. En su mayoría, con una estructura de carpetas como esta, deberías tener casi ningún archivo en la raíz de tu carpeta src aparte de cosas como tu archivo index.js.

El otro gran cambio entre esta estructura de carpetas y la estructura de carpetas simple es que ahora estamos dividiendo nuestro proyecto en páginas, las cuales encapsulan toda la lógica para páginas específicas en una única ubicación. Esto es realmente útil en proyectos más grandes ya que ahora puedes encontrar toda la información relacionada con tus páginas en una carpeta en lugar de tener que buscar en múltiples carpetas y filtrar archivos no relacionados.

También notarás que nuestros tests ahora están localizados en la carpeta/específica/s que están probando. Esto facilita ver qué código está siendo probado, lo que en general facilita la prueba de código cuando las pruebas se encuentran en la misma ubicación que el código que está siendo probado.

### pages
El mayor cambio en esta estructura de carpetas es la adición de la carpeta "pages". Esta carpeta debería contener una carpeta para cada página de tu aplicación. Dentro de esas carpetas específicas de la página debería haber un archivo raíz que sea tu página (generalmente index.js) junto con todos los archivos que solo son aplicables a esa página. Por ejemplo, en la imagen anterior tenemos una página de inicio de sesión que contiene el archivo raíz index.js, un componente llamado LoginForm y un hook llamado useLogin. Este componente y hook solo se usan en la página de inicio de sesión, por lo que se almacenan con esta página en lugar de estar almacenados en las carpetas globales de hooks o componentes.

Esta separación del código específico de la página de tu código global general es la mayor ventaja de este sistema sobre la estructura de carpetas simple. Es más fácil ver lo que tu aplicación está haciendo cuando todo el código relevante está agrupado en una sola carpeta.

### components
Otro gran cambio que notarás con este ejemplo es que nuestra carpeta de componentes se divide aún más en subcarpetas. Estas subcarpetas son realmente útiles ya que ayudan a mantener tus componentes organizados en diferentes secciones en lugar de ser simplemente una gran masa de componentes. En nuestro ejemplo, tenemos una carpeta ui que contiene todos nuestros componentes de interfaz de usuario como botones, modales, tarjetas, etc. También tenemos una carpeta de formularios para controles específicos de formularios como casillas de verificación, entradas, selectores de fecha, etc.

Puedes personalizar y dividir esta carpeta de componentes como mejor te parezca según las necesidades de tu proyecto, pero idealmente esta carpeta no debería ser demasiado grande, ya que muchos de tus componentes más complejos estarán almacenados en la carpeta de páginas.

### hooks
La última carpeta que se repite de la estructura de carpetas simple es la carpeta de hooks. Esta carpeta es prácticamente idéntica a la carpeta de hooks anterior, pero en lugar de almacenar todos los hooks de tu aplicación, solo almacenará los hooks globales que se utilizan en múltiples páginas. Esto es porque todos los hooks específicos de página se almacenan en la carpeta de páginas.

#### ¿Qué es un hook?
Un hook es una función especial que te permite "enganchar" funcionalidades adicionales de React. Por ejemplo, useState es un hook que te permite añadir el estado de React a componentes funcionales. Estos se introdujeron en React 16.8 y permiten usar características de React sin tener que escribir una clase.

### assets
La carpeta de activos contiene todas las imágenes, archivos CSS, archivos de fuente, etc., para tu proyecto. Prácticamente cualquier cosa que no esté relacionada con el código se almacenará en esta carpeta.

### context
La carpeta de contexto almacena todos tus archivos de contexto de React que se utilizan en múltiples páginas. En proyectos más grandes, encontrarás que tienes múltiples contextos que usas en tu aplicación y tener una única carpeta para almacenarlos es realmente útil. Si estás utilizando un almacenamiento de datos global diferente, como Redux, puedes reemplazar esta carpeta con un conjunto más apropiado de carpetas para almacenar archivos de Redux.

### data
La carpeta de datos es similar a la carpeta de activos, pero esta es para almacenar nuestros activos de datos, como archivos JSON que contienen información utilizada en nuestro código (elementos de la tienda, información de temas, etc.). Esta carpeta también puede almacenar un archivo que contiene variables constantes globales. Esto es útil cuando tienes muchas constantes que usas en toda tu aplicación, como variables de entorno. En primera instancia la vamos a usar para las entidades mock al no contar con base de datos.

### utils
La última carpeta nueva es la carpeta de utilidades. Esta carpeta es para almacenar todas las funciones de utilidad, como formateadores. Esta es una carpeta bastante sencilla y todos los archivos en esta carpeta también deben serlo. Generalmente, me gusta almacenar solo funciones puras en esta carpeta, ya que si una función de utilidad tiene efectos secundarios, probablemente no sea solo una simple función de utilidad. Obviamente, hay excepciones a esta regla, sin embargo. Además, si no estás familiarizado con las funciones puras, consulta mi guía completa sobre funciones puras.

## Ventajas
La mayor ventaja de este nuevo sistema es que todos tus archivos tienen su propia carpeta. La raíz real de la carpeta src debería tener casi ningún archivo en ella.

Otra gran ventaja es que tus archivos ahora están ubicados en función de la página en la que se usan. Esto es bueno, ya que, en general, a medida que un proyecto crece, es cada vez más importante tener archivos que se usan juntos almacenados juntos, ya que facilita la comprensión, escritura y lectura del código, ya que reduce la cantidad de código global almacenado en tus carpetas generales de componentes, hooks, etc.

## Desventajas
La mayor desventaja de este sistema es que a medida que tu aplicación crece aún más, tu carpeta de páginas comenzará a ser menos y menos útil. Esto se debe a que, a medida que tu aplicación tiene más páginas, es más

# Configuration
## Índice
1. [Introducción con Create React App](#introducción-con-create-react-app)
2. [Scripts Disponibles](#scripts-disponibles)
3. [Más Información](#más-información)
4. [Configuración para el Entorno de Desarrollo Local](#configuración-para-el-entorno-de-desarrollo-local)

---

# Introducción con Create React App <a name="introducción-con-create-react-app" >

Este proyecto fue inicializado con [Create React App](https://github.com/facebook/create-react-app).

## Scripts Disponibles <a name="scripts-disponibles" >

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verlo en tu navegador.

La página se recargará si realizas cambios.\
También podrás ver errores de lint en la consola.

### `npm test`

Inicia el ejecutor de pruebas en el modo interactivo de observación.\
Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Empaqueta correctamente React en modo de producción y optimiza la construcción para obtener el mejor rendimiento.

La construcción es minimizada y los nombres de los archivos incluyen los hashes.\
¡Tu aplicación está lista para ser desplegada!

Consulta la sección sobre [despliegue](https://facebook.github.io/create-react-app/docs/deployment) para más información.

### `npm run eject`

**Nota: esta es una operación irreversible. Una vez que hagas `eject`, ¡no puedes volver atrás!**

Si no estás satisfecho con la herramienta de construcción y las opciones de configuración, puedes hacer `eject` en cualquier momento. Este comando eliminará la única dependencia de construcción de tu proyecto.

En su lugar, copiará todos los archivos de configuración y las dependencias transitivas (webpack, Babel, ESLint, etc.) directamente en tu proyecto para que tengas control total sobre ellos. Todos los comandos, excepto `eject`, seguirán funcionando, pero apuntarán a los scripts copiados para que puedas modificarlos. A partir de este punto, estás por tu cuenta.

No es necesario que utilices `eject` nunca. El conjunto de características seleccionadas es adecuado para despliegues pequeños y medianos, y no deberías sentirte obligado a usar esta función. Sin embargo, entendemos que esta herramienta no sería útil si no pudieras personalizarla cuando estés listo para ello.

## Más Información <a name="más-información" >

Puedes obtener más información en la [documentación de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, consulta la [documentación de React](https://reactjs.org/).

### División de Código

Esta sección se ha movido aquí: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analizando el Tamaño del Paquete

Esta sección se ha movido aquí: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Creando una Aplicación Web Progresiva

Esta sección se ha movido aquí: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Configuración Avanzada

Esta sección se ha movido aquí: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Despliegue

Esta sección se ha movido aquí: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` falla al minimizar

Esta sección se ha movido aquí: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

# Configuración para el Entorno de Desarrollo Local <a name="configuración-para-el-entorno-de-desarrollo-local" >

... (Esta sección se mantiene sin cambios, ya que ya está en español)

---

Espero que esto te sea útil. Si hay otras secciones o detalles específicos que te gustaría agregar o cambiar, házmelo saber. ¡Estoy aquí para ayudar!
---
# Configuracion para el entorno de Desarrollo Local

Para garantizar la calidad y consistencia del código en nuestro proyecto, hemos implementado [ESLint](https://eslint.org/) y [Prettier](https://prettier.io/). A continuación, se presentan los pasos para configurar tu ambiente de desarrollo para trabajar con estas herramientas.

### 1. Instalación de Dependencias

Luego de clonar o actualizar el repositorio, debes instalar todas las dependencias necesarias. Esto incluye paquetes relacionados con ESLint, Prettier y otros paquetes asociados.

```bash
npm install
```

### 2. Configuración de VSCode

Si estás utilizando Visual Studio Code como editor:

- Asegúrate de tener instaladas las extensiones "ESLint" y "Prettier - Code formatter".
- Estas extensiones proporcionarán resaltado en tiempo real de los errores y advertencias del linter, y también permitirán la corrección automática al guardar (si se configuró de esta manera).

### 3. Ejecución y Comprobación del Linter

Para comprobar que todo está configurado correctamente, puedes ejecutar el linter en todo el proyecto o en archivos específicos:

```bash
npm run lint
```

Si también deseas corregir automáticamente los errores detectados (cuando sea posible):

```bash
npm run lint:fix
```

### 4. Configuración Personalizada de VSCode

Si se requiere alguna configuración adicional o personalizada en VSCode (por ejemplo, para el comportamiento de guardado automático), consulta con el equipo o revisa la configuración local en `.vscode/settings.json`.

### 5. Consideraciones Adicionales

- Evita el uso de operadores unarios como `++` y `--` para mantener la claridad y legibilidad del código.
- Si surgen problemas o incompatibilidades, consulta con el equipo o revisa las versiones de las dependencias en `package.json`.

---

Puedes agregar esta sección a tu `README.md` y adaptarla según las necesidades específicas de tu proyecto o cualquier detalle adicional que desees incluir.
