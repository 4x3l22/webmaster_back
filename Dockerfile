# Multi-stage build para Node.js + TypeScript
FROM node:22-alpine AS builder

# Instalar dependencias del sistema para compilar módulos nativos
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instalar todas las dependencias
RUN npm install

# Copiar código fuente
COPY src ./src
COPY .sequelizerc ./

# Compilar TypeScript
RUN npm run build

# Etapa de producción
FROM node:22-alpine

# Instalar dumb-init para manejo correcto de señales
RUN apk add --no-cache dumb-init

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /app

# Copiar node_modules de producción
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copiar código compilado
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Copiar archivos necesarios para migraciones
COPY --from=builder --chown=nodejs:nodejs /app/src/config ./src/config
COPY --from=builder --chown=nodejs:nodejs /app/src/migrations ./src/migrations
COPY --from=builder --chown=nodejs:nodejs /app/src/seeders ./src/seeders
COPY --from=builder --chown=nodejs:nodejs /app/.sequelizerc ./.sequelizerc
COPY --chown=nodejs:nodejs package*.json ./

# Cambiar a usuario no-root
USER nodejs

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Usar dumb-init
ENTRYPOINT ["dumb-init", "--"]

# Comando de inicio
CMD ["node", "dist/app.js"]
