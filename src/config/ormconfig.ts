import { DataSource, DataSourceOptions } from "typeorm";

const getDataSourceConfig = (): DataSourceOptions => {
  const baseConfig = {
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
  };

  if (process.env.DB_TYPE === "sqlite") {
    return {
      ...baseConfig,
      type: "sqlite",
      database: ":memory:",
      extra: {
        pragma: "foreign_keys=ON",
      },
    };
  }

  return {
    ...baseConfig,
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
};

const AppDataSource = new DataSource(getDataSourceConfig());

export default AppDataSource;
