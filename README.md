# Orders Demo App Backend
**Orders Demo App Backend** es una API RESTful construida con TypeScript, Node.js, Express y MongoDB, diseñada para gestionar órdenes mediante operaciones CRUD.

El proyecto aplica una arquitectura modular por capas, con separación clara entre controladores, servicios, repositorios y DTOs, lo que facilita su mantenimiento, testeo y escalabilidad.

## Características principales

CRUD completo de órdenes (Order).

Arquitectura por capas: controllers, dto, models, repository, routes, services, shared.

Integración con MongoDB mediante Mongoose.

Tipado estricto con TypeScript.

Variables de entorno gestionadas con dotenv.

Middleware CORS configurado.

Pruebas automatizadas con Jest y Supertest.

Configuración modular y reutilizable (config, datasource, shared).

## Stack tecnológico

Node.js	- Express - TypeScript - MongoDB / Mongoose	- Jest + Supertest - Dotenv - CORS

## Instalación y ejecución

**1 - Clonar el repositorio**

git clone https://github.com/tuusuario/orders-demo-app-back.git
cd orders-demo-app-back

**2 -  Instalar dependencias**
npm install

**3 - Configurar variables de entorno**

Crea un archivo .envdev.env en la raíz del proyecto con el siguiente contenido:

DB_MONGO_URL=mongodb://localhost:27017/orders-demo
NODE_ENV=development

**4 - Ejecutar en modo desarrollo**
npm run start:dev

## Endpoints principales

| Método        | Ruta                      | Descripción |
| ------------- |:-------------:            |:-------------:|
| GET           | /api/v1/orders            | Obtiene todas las órdenes |
| GET           | /api/v1/orders/:id        | Obtiene una orden por ID     |
| POST          | /api/v1/orders            | Crea una nueva orden     |
| PUT           | /api/v1/orders/:id        | Actualiza una orden existente     |
| DELETE        | /api/v1/orders/:id        | Elimina una orden     |

**El proyecto incluye pruebas automatizadas con Jest y Supertest.**

Ejecutar todas las pruebas
`npm test` o `npm run test:watch`

## Autor

**Orders Demo App Backend**
Desarrollado por Josue Valbuena.
Proyecto educativo y de demostración con Node.js + TypeScript.