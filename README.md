# Brainify

El presente repositorio alberga los dos proyectos que componen Brainify, ubicados en los directorios frontend y backend

## Backend

### Introduccion
Brainify es una plataforma de servicios en línea que permite a los usuarios ofrecer y buscar servicios. Los Proveedores, es decir, los usuarios que ofrecen sus servicios, pueden registrarse, autenticarse y gestionar servicios y contrataciones, así como decidir si los comentarios recibidos son publicados.

### Funcionalidades Básicas
- **Autenticación y Autorización**: Los usuarios pueden registrarse y autenticarse.

- **Gestión de Perfiles**: Los usuarios autenticados pueden ver y actualizar su perfil, incluyendo título y experiencia.

- **Servicios**: Los usuarios autenticados pueden crear, actualizar y eliminar servicios, que ahora pueden incluir imágenes para una mejor presentación. Cada servicio tiene atributos como nombre, descripción, categoría, costo, tipo, etc.

- **Contratos de Servicio**: Los usuarios pueden crear, actualizar y listar contrataciones de servicio. Los contratos incluyen información de contacto y el estado del servicio.

- **Comentarios**: Los usuarios pueden ver y crear comentarios en servicios específicos. Los Proveedores gestionan la publicación de estos comentarios.

### Aspectos Técnicos
- **Tecnologías Utilizadas**: Node.js, Express.js, MongoDB.

- **Autenticación y Seguridad**: Uso de JSON Web Tokens. Contraseñas almacenadas en forma hash.

- **Validación de Datos**: Validaciones mediante Express Validator.

- **Manejo de Errores**: Función handleError para manejar respuestas de error. Errores registrados en consola.

- **Middlewares**: Verificación de tokens y validación de datos.

- **Modelos y Esquemas**: Modelos y esquemas de Mongoose para usuarios, servicios, contratos de servicio y comentarios.

- **Rutas, Controladores y Servicios**: Organizados en diferentes archivos para cada funcionalidad.

- **Configuración del Entorno**: Uso de archivo .env en el directorio /backend para variables de entorno.

## Frontend

Este es el frontend para Brainify, una plataforma de servicios en línea que permite a los usuarios, ahora referidos como Proveedores, ofrecer y buscar servicios. Este frontend ofrece una interfaz de usuario interactiva y amigable para acceder a todas las funcionalidades proporcionadas por el backend de Brainify.

### Funcionalidades Clave

- **Interfaz de Usuario Intuitiva**: Experiencia fluida para navegar por los servicios, registrarse, autenticarse y gestionar servicios.

- **Gestión de Servicios**: Permite a los usuarios crear, ver, actualizar y eliminar servicios, incluyendo la posibilidad de agregar imágenes.

- **Gestión de Contrataciones de Servicio**: Gestión de contrataciones, incluyendo creación y actualización.

- **Comentarios y Retroalimentación**: Posibilidad de dejar comentarios en los servicios y ver los de otros usuarios. Los Proveedores tienen control sobre la publicación de estos comentarios.

- **Responsive Design**: Diseño adaptativo para dispositivos móviles y de escritorio.

### Tecnologías Utilizadas

- **React**: Para construir una interfaz de usuario interactiva.

- **Axios**: Para realizar solicitudes HTTP al backend.

- **Formik y Yup**: Para gestión de formularios y validación de datos.

- **MaterialUI v5, React-Router-Dom, etc**: Para diversas funcionalidades adicionales.

# Guia de instalacion para ambos proyectos
## Variables de Entorno
Configura las siguientes variables en tu archivo .env:

- **PORT**: Puedes elegir en que puerto de localhost corra el backend (por defecto es el 4000).
- **CLOUDINARY_CLOUD_NAME**: Nombre de tu cuenta en Cloudinary.
- **CLOUDINARY_API_KEY**: Clave API de Cloudinary.
- **CLOUDINARY_API_SECRET**: Clave API Secret de Cloudinary.
- **SENDGRID_API_KEY**: Clave API de SendGrid.
- **USER_EMAIL**: Dirección de correo para enviar emails a través de SendGrid.
- **URI_MONGO**: URI de conexión a MongoDB. Incluye tus credenciales y el nombre de la base de datos.
- **JWT_SECRET**: Clave secreta para tokens JWT.
- **ORIGIN**: URL del origen permitido para solicitudes CORS.

Nota: Mantén estas variables seguras y no las compartas públicamente.

## Instalación y Ejecución
1. Clona el repositorio https://github.com/fedeferreyra98/brainify.git.
2. Instala las dependencias ejecutando npm install (usando --force en el caso de frontend debido a problemas de dependencias con Material UI v5) en los directorios /frontend y /backend.
3. Crea un archivo .env en el directorio /backend con las variables de entorno necesarias.
4. Ejecuta la aplicación con npm start en ambos proyectos /frontend y /backend.

###  Tambien puedes consultar la documentacion de la [Brainify-API](https://documenter.getpostman.com/view/30977948/2s9YeG7XFL)