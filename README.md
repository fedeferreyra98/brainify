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
