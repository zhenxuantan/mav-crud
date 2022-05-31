import { dbConfig } from "../config";
import { Dialect, Sequelize } from "sequelize";
import { Employees } from "./employee";
import { Users } from "./user";

export const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect as Dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

export const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  employees: Employees,
  users: Users,
};
