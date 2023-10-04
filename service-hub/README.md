# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

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
