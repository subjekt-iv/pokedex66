## Descripción

Esta app utiliza **Vue.js 3** para la construcción de la interfaz de usuario, **Pinia** para la gestión del estado, **Vue Router** para la navegación, y **Tailwind CSS** para el diseño responsivo.

## Estructura del Proyecto

El proyecto está organizado en varias carpetas principales siguiendo el enfoque de **Atomic Design**:

- **components/**: Contiene los componentes de Vue estructurados según el enfoque de Atomic Design. Incluye:

  - **atoms/**: Componentes básicos y reutilizables como botones e imágenes.
  - **molecules/**: Componentes formados por la combinación de átomos, como **BottomBar** y **Modal**.
  - **organisms/**: Decidí omitirlo ya que es una app muy simple.

- **views/**: Vistas completas que representan diferentes secciones de la aplicación.

- **store/**: Utiliza **Pinia** para la gestión del estado global de la aplicación.

- **router/**: Contiene la configuración de rutas de la aplicación utilizando **Vue Router**.

## Configuración del Proyecto

Para configurar y ejecutar el proyecto en tu entorno local, sigue estos pasos:

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

Saludos y gracias 0/

A.
