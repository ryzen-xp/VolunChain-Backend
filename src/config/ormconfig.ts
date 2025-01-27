import { DataSource } from "typeorm";
import { createClient } from "redis";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: ["dist/entities/**/*.js"],
  migrations: ["dist/migrations/**/*.js"],
});

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

export { AppDataSource, redisClient };
