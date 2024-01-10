import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.USER_SERVICE_POSTGRES_HOST,
  port: Number(process.env.USER_SERVICE_POSTGRES_PORT),
  // schema: process.env.USER_SERVICE_POSTGRES_SCHEMA,
  username: process.env.USER_SERVICE_POSTGRES_USER,
  password: process.env.USER_SERVICE_POSTGRES_PASSWORD,
  database: process.env.USER_SERVICE_POSTGRES_INSTANCE,
  entities: ['ORM/dist/apps/user-service/src/**/*.entity.js'],
  migrations: ['ORM/dist/apps/api-service/migration/**/*.js'],
});
