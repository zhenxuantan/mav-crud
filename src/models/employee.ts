import { DataTypes } from "sequelize";
import { sequelize } from ".";
import Joi from "joi";
import DEPARTMENT from "./department";

export interface employee {
  name: string;
  salary: number;
  department: DEPARTMENT;
}

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
