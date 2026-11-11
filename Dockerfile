FROM node:20-alpine 

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al contenedor
COPY package.json package-lock.json ./
#COPY .env.production .env.production
RUN npm install

# Copia el resto de la aplicación
COPY . .

# NEXT_PUBLIC_* queda incorporada al bundle del navegador durante el build.
ARG NEXT_PUBLIC_STOCK_API_URL=https://stocktiendasapi.jvcsoluciones.cloud
ENV NEXT_PUBLIC_STOCK_API_URL=${NEXT_PUBLIC_STOCK_API_URL}

# Construye la aplicación
RUN npm run build

# Expone el puerto 3003
EXPOSE 3003

# Inicia la aplicación en modo producción
CMD ["npm", "start"]