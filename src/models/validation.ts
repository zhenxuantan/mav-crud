import Joi from "joi";

import { DEPARTMENT } from "../models/employee";

export const employeeSchema = Joi.object({
  id: Joi.number().integer().min(0).required(),
  name: Joi.string().alphanum().min(3).max(100).required(),
  salary: Joi.number().integer().min(0).strict(true).required(),
  department: Joi.string()
    .valid(...Object.values(DEPARTMENT))
    .required(),
}).unknown(false);
