# TheStudents — Backend

API REST desarrollada con **Node.js**, **Express** y **Sequelize** que gestiona usuarios y reseñas de la plataforma TheStudents. Usa **PostgreSQL** como base de datos.

---

## Tecnologías

| Herramienta | Versión |
|---|---|
| Node.js | >= 18 |
| Express | ^5.2.1 |
| Sequelize | ^6.37.8 |
| PostgreSQL | >= 14 |
| pg / pg-hstore | ^8.23.0 / ^2.3.4 |
| Morgan | ^1.12.1 |
| Nodemon (dev) | ^3.1.14 |

---

## Estructura del proyecto

```
TheStudents_Backend/
├── src/
│   ├── controller/
│   │   ├── usuario.controller.js   # Lógica de negocio para usuarios
│   │   ├── resena.controller.js    # Lógica de negocio para reseñas
│   │   └── inscripcion.controller.js # Lógica de negocio para inscripciones
│   ├── database/
│   │   ├── database.js             # Conexión a PostgreSQL con Sequelize
│   │   ├── initUsuarios.js         # Datos iniciales de usuarios
│   │   └── initResenas.js          # Datos iniciales de reseñas
│   ├── models/
│   │   ├── Usuario.js              # Modelo de la tabla Usuario
│   │   ├── Resena.js               # Modelo de la tabla Resena
│   │   └── relations.js            # Definición de asociaciones entre modelos
│   ├── routes/
│   │   ├── usuario.routes.js       # Rutas del recurso /usuario
│   │   ├── resena.routes.js        # Rutas del recurso /resena
│   │   └── inscripcion.routes.js   # Rutas del recurso /inscripcion
│   ├── app.js                      # Configuración de Express
│   └── index.js                    # Punto de entrada de la aplicación
├── package.json
└── README.md
```

---

## Modelos

### Usuario
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INTEGER (PK, autoincrement) | Identificador único |
| `correo` | STRING(120), unique | Correo electrónico (validado con isEmail) |
| `nombre_usuario` | STRING(20), unique | Nombre de usuario |
| `nombre` | STRING(80) | Nombre completo |
| `biografia` | STRING(280) | Biografía del usuario |
| `foto_url` | STRING | URL de la foto de perfil |
| `carrera` | STRING(120) | Nombre de la carrera universitaria |
| `semestre` | SMALLINT | Semestre actual |
| `estado` | STRING(12) | Estado de la cuenta |
| `fecha_creacion` | DATE | Fecha de registro (default: NOW) |

### Resena
| Campo | Tipo | Descripción |
|---|---|---|
| `id` | INTEGER (PK) | Identificador único autogenerado |
| `inscripcion_autor_id` | INTEGER (FK → Inscripcion) | Inscripción que escribe la reseña |
| `inscripcion_resenado_id` | INTEGER (FK → Inscripcion) | Inscripción que recibe la reseña |
| `contenido` | STRING(1000) | Contenido de la reseña |
| `fecha_creacion` | DATE | Fecha de creación (default: NOW) |
| `fecha_edicion` | DATE | Fecha de última edición |
| `estado` | STRING(12) | Estado de la reseña |

> **Restricción única:** No puede existir más de una reseña de la misma inscripción hacia la misma inscripción.

---

## Endpoints

### `/usuario`

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/usuario` | Obtiene todos los usuarios |
| `GET` | `/usuario/:id` | Obtiene un usuario por su ID |

### `/resena`

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/resena/resenado/:resenado_id` | Obtiene todas las reseñas recibidas por las inscripciones de un usuario |
| `GET` | `/resena/autor/:autor_id` | Obtiene todas las reseñas escritas por las inscripciones de un usuario |
| `POST` | `/resena` | Crea una nueva reseña |
| `PUT` | `/resena/:id` | Actualiza el contenido o estado de una reseña |
| `DELETE` | `/resena/:id` | Elimina una reseña |

### `/inscripcion`

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/inscripcion/companeros/:usuario_id` | Obtiene los usuarios que comparten materias y periodos con el usuario, incluyendo las inscripciones compartidas |

#### Respuesta de `GET /inscripcion/companeros/:usuario_id`
Cada compañero aparece una sola vez y contiene una lista `inscripciones_compartidas`:
```json
[
  {
    "id": 2,
    "nombre_usuario": "usuario2",
    "inscripciones_compartidas": [
      {
        "materia": "Bases de Datos",
        "periodo": "2026-1"
      }
    ]
  }
]
```

#### Body para `POST /resena`
```json
{
  "autor_id": 1,
  "resenado_id": 2,
  "materia": "Bases de Datos",
  "periodo": "2026-1",
  "contenido": "Excelente compañero de estudio."
}
```

#### Body para `PUT /resena/:id`
```json
{
  "contenido": "Comentario actualizado.",
  "estado": "oculto"
}
```

---

## Puertos

| Servicio | Puerto | Descripción |
|---|---|---|
| **Express (API)** | `3000` | Servidor HTTP de la aplicación |
| **PostgreSQL** | `5432` | Base de datos relacional |

---

## Configuración de la base de datos

La conexión se configura en `src/database/database.js`:

```js
new Sequelize("TheStudents", "postgres", password, {
    host: "localhost",
    port: 5432,
    dialect: "postgres"
});
```

Asegúrate de tener PostgreSQL corriendo localmente con:
- **Base de datos:** `TheStudents`
- **Usuario:** `postgres`
- **Contraseña:** password

---

## Cómo correr el proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor en modo desarrollo

```bash
npm run dev
```

Esto levanta el servidor con **nodemon**, el cual reinicia automáticamente al detectar cambios.

### 3. Verificar que está corriendo

```
Database connection established successfully.
Server is running on port 3000
```

La API estará disponible en: `http://localhost:3000`
