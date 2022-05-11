"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeSchema = exports.newEmployeeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.newEmployeeSchema = joi_1.default.object({
    name: joi_1.default.string().alphanum().min(3).max(100).required(),
    salary: joi_1.default.number().integer().min(0).required(),
    department: joi_1.default.string().required(),
}).unknown(false);
exports.updateEmployeeSchema = joi_1.default.object({
    name: joi_1.default.string().alphanum().min(3).max(100),
    salary: joi_1.default.number().integer().min(0),
    department: joi_1.default.string(),
})
    .or("name", "salary", "department")
    .unknown(false);
