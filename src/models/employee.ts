import { DataTypes } from "sequelize";
import Joi from "joi";
import DEPARTMENT from "./department";
import { dbConfig } from "../config";
import { Dialect, Sequelize } from "sequelize";

export interface employee {
  name: string;
  salary: number;
  department: DEPARTMENT;
}

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

export const Employees = sequelize.define(
  "employees",
  {
    name: { type: DataTypes.STRING },
    salary: { type: DataTypes.INTEGER },
    department: { type: DataTypes.ENUM(DEPARTMENT.HR, DEPARTMENT.PS) },
  },
  { timestamps: false }
);

export const employeeSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[\\w\\-\\s]+$"))
    .min(4)
    .max(30)
    .required(),
  salary: Joi.number().integer().min(0).max(2000000000).strict(true).required(),
  department: Joi.string()
    .valid(...Object.values(DEPARTMENT))
    .required(),
}).unknown(false);
