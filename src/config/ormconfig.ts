import { DataSource } from 'typeorm';
import { User } from '../entities/User';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User], 
  migrations: ['dist/migrations/**/*.js'], 
});

export default AppDataSource;