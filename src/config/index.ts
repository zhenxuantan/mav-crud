export const dbConfig = {
  HOST: "db",
  USER: "postgres",
  PASSWORD: "pw",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
