import { DataTypes } from "sequelize";
import { sequelize } from ".";
import Joi from "joi";
import DEPARTMENT from "./department";

export interface user {
  username: string;
  password: string;
  department: DEPARTMENT;
}

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
  username: Joi.string()
    .pattern(new RegExp("^[\\w\\-\\s]+$"))
    .min(4)
    .max(30)
    .required(),
  password: Joi.string().required(),
  department: Joi.string()
    .valid(...Object.values(DEPARTMENT))
    .required(),
}).unknown(false);
