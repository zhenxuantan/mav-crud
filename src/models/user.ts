import { DataTypes } from "sequelize";
// import { sequelize } from ".";
import Joi from "joi";
import DEPARTMENT from "./department";
import { dbConfig } from "../config";
import { Dialect, Sequelize } from "sequelize";

export interface user {
  username: string;
  password: string;
  department: DEPARTMENT;
}

export interface userLogin {
  username: string;
  password: string;
}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

export const Users = sequelize.define(
  "users",
  {
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    department: { type: DataTypes.ENUM(DEPARTMENT.HR, DEPARTMENT.PS) },
  },
  { timestamps: false }
);

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(30).required(),
  password: Joi.string().required(),
  department: Joi.string()
    .valid(...Object.values(DEPARTMENT))
    .required(),
}).unknown(false);

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(30).required(),
  password: Joi.string().required(),
}).unknown(false);
