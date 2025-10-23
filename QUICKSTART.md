# Guía Rápida de Migraciones con Supabase

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
| `npm run db:setup` | Ejecuta todas las migraciones en Supabase |
| `npm run db:migrate` | Ejecuta las migraciones pendientes |
| `npm run db:migrate:undo` | Revierte la última migración |
| `npm run db:migrate:undo:all` | Revierte todas las migraciones |
| `npm run db:seed` | Inserta datos de prueba |
| `npm run db:seed:undo` | Elimina los datos de prueba |

## 🏗️ Estructura Creada en Supabase

```
postgres (Supabase)/
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
.env
```

Variables necesarias:
- `DB_HOST`: Host de Supabase (pooler.supabase.com)
- `DB_PORT`: Puerto (6543 para pooler)
- `DB_NAME`: Nombre de la base de datos (postgres)
- `DB_USER`: Usuario con formato postgres.PROJECT_REF
- `DB_PASSWORD`: Contraseña de tu base de datos Supabase

**Nota:** Para migraciones con Sequelize CLI, también necesitas `src/config/config.json` configurado.

## 🔄 Flujo de Trabajo

1. **Desarrollo Local:**
   ```bash
   npm run db:migrate
   npm run db:seed
   npm run dev
   ```

2. **Producción:**
   ```bash
   npm run db:migrate
   npm start
   ```

3. **Reset de datos (desarrollo):**
   ```bash
   npm run db:migrate:undo:all
   npm run db:migrate
   npm run db:seed
   ```

## 📝 Notas Importantes

- ✅ Las migraciones se ejecutan en orden secuencial según su timestamp
- ✅ Cada migración se registra en la tabla `SequelizeMeta`
- ✅ Los soft deletes están habilitados (`deletedAt`)
- ✅ Las relaciones entre tablas están definidas con claves foráneas
- ✅ Conexión a Supabase vía Connection Pooler (IPv4)
- ⚠️ PostgreSQL es case-sensitive: usa comillas dobles en nombres con mayúsculas
- ⚠️ Nunca modifiques una migración que ya fue ejecutada
- ⚠️ Para cambios, crea una nueva migración
- ⚠️ No se pueden crear/eliminar bases de datos en Supabase (usa la existente)

## 🆘 Ayuda

Para más información sobre Sequelize CLI:
```bash
npx sequelize-cli --help
```
