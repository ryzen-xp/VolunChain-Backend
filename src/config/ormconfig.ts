import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // Usa DATABASE_URL desde variables de entorno
  entities: ["dist/entities/**/*.js"], // Rutas compatibles con `dist`
  migrations: ["dist/migrations/**/*.js"],
  synchronize: true, // Cambiar a false en producción
  logging: true,
});

export default AppDataSource;
