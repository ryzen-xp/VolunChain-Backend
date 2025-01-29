import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: ['dist/entities/**/*.js'], 
  migrations: ['dist/migrations/**/*.js'], 
});

export default AppDataSource;
