"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL, // Usa DATABASE_URL desde variables de entorno
    entities: ["dist/entities/**/*.js"], // Rutas compatibles con `dist`
    migrations: ["dist/migrations/**/*.js"],
    synchronize: true, // Cambiar a false en producción
    logging: true,
});
exports.default = AppDataSource;
