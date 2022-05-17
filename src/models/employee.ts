import Joi from "joi";

export enum DEPARTMENT {
  HR = "HR",
  PS = "PS",
}

export interface employee {
  name: string;
  salary: number;
  department: DEPARTMENT;
}

export const employeeSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[\\w\\-\\s]+$"))
    .min(1)
    .max(200)
    .required(),
  salary: Joi.number().integer().min(0).strict(true).required(),
  department: Joi.string()
    .valid(...Object.values(DEPARTMENT))
    .required(),
}).unknown(false);
