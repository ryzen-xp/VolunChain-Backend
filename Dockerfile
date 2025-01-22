# Usa la imagen oficial de Node.js como base
FROM node:18

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente al contenedor
COPY . .

# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
