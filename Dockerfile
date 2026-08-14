# Etapa 1: Construcción
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Servir con NGINX
FROM nginx:alpine

# Elimina archivos html por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copia el build generado
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
