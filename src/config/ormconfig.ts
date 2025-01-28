import { DataSource } from 'typeorm';
import { DatabaseError } from '../errors';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: ['dist/entities/**/*.js'], 
  migrations: ['dist/migrations/**/*.js'], 
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");
  } catch (error) {
    throw new DatabaseError("Database connection failed", {
      field: "database_initialization",
      error: error instanceof Error ? error.message: "Unknown error",
    });
  }
};

export default AppDataSource;
