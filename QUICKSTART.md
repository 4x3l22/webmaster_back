# Guía Rápida de Migraciones de Sequelize

## 🚀 Inicio Rápido

### 1. Primera vez (Setup completo)
```bash
npm run db:setup
```

### 2. Agregar datos de prueba (Opcional)
```bash
npm run db:seed
```

### 3. Iniciar el servidor
```bash
npm run dev
```

## 📋 Comandos Principales

| Comando | Descripción |
|---------|-------------|
| `npm run db:setup` | Crea la BD y ejecuta todas las migraciones |
| `npm run db:create` | Solo crea la base de datos |
| `npm run db:migrate` | Ejecuta las migraciones pendientes |
| `npm run db:migrate:undo` | Revierte la última migración |
| `npm run db:seed` | Inserta datos de prueba |
| `npm run db:seed:undo` | Elimina los datos de prueba |
| `npm run db:drop` | **⚠️ ELIMINA la base de datos completa** |

## 🏗️ Estructura Creada

```
webmaster_db/
├── Categories
│   ├── id (PK)
│   ├── name
│   ├── description
│   ├── createdAt
│   ├── updatedAt
│   └── deletedAt
│
└── Products
    ├── id (PK)
    ├── name
    ├── categoryId (FK -> Categories.id)
    ├── price
    ├── stock
    ├── createdAt
    ├── updatedAt
    └── deletedAt
```

## 💡 Ejemplos de Uso

### Crear una migración nueva
```bash
npx sequelize-cli migration:generate --name add-image-to-products
```

### Crear un seeder nuevo
```bash
npx sequelize-cli seed:generate --name add-more-categories
```

## ⚙️ Configuración

La configuración de la base de datos está en:
```
src/config/config.json
```

Asegúrate de ajustar:
- `username`: Tu usuario de MySQL
- `password`: Tu contraseña de MySQL
- `database`: Nombre de la base de datos
- `host`: Servidor (generalmente "localhost")
- `port`: Puerto de MySQL (generalmente 3306)

## 🔄 Flujo de Trabajo

1. **Desarrollo Local:**
   ```bash
   npm run db:setup
   npm run db:seed
   npm run dev
   ```

2. **Producción:**
   ```bash
   npm run db:create
   npm run db:migrate
   npm start
   ```

3. **Reset completo (desarrollo):**
   ```bash
   npm run db:drop
   npm run db:setup
   npm run db:seed
   ```

## 📝 Notas Importantes

- ✅ Las migraciones se ejecutan en orden secuencial según su timestamp
- ✅ Cada migración se registra en la tabla `SequelizeMeta`
- ✅ Los soft deletes están habilitados (`deletedAt`)
- ✅ Las relaciones entre tablas están definidas con claves foráneas
- ⚠️ Nunca modifiques una migración que ya fue ejecutada
- ⚠️ Para cambios, crea una nueva migración

## 🆘 Ayuda

Para más información sobre Sequelize CLI:
```bash
npx sequelize-cli --help
```
