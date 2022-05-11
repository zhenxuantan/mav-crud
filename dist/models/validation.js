"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const employee_1 = require("../models/employee");
exports.employeeSchema = joi_1.default.object({
    id: joi_1.default.number().integer().min(0).required(),
    name: joi_1.default.string().alphanum().min(3).max(100).required(),
    salary: joi_1.default.number().integer().min(0).strict(true).required(),
    department: joi_1.default.string()
        .valid(...Object.values(employee_1.DEPARTMENT))
        .required(),
}).unknown(false);
