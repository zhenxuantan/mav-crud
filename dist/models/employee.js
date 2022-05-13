"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeSchema = exports.Employees = exports.DEPARTMENT = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const joi_1 = __importDefault(require("joi"));
var DEPARTMENT;
(function (DEPARTMENT) {
    DEPARTMENT["HR"] = "HR";
    DEPARTMENT["PS"] = "PS";
})(DEPARTMENT = exports.DEPARTMENT || (exports.DEPARTMENT = {}));
const sequelize = new sequelize_1.Sequelize(config_1.dbConfig.DB, config_1.dbConfig.USER, config_1.dbConfig.PASSWORD, {
    host: config_1.dbConfig.HOST,
    dialect: config_1.dbConfig.dialect,
    omitNull: true,
    pool: {
        max: config_1.dbConfig.pool.max,
        min: config_1.dbConfig.pool.min,
        acquire: config_1.dbConfig.pool.acquire,
        idle: config_1.dbConfig.pool.idle,
    },
});
exports.Employees = sequelize.define("employees", {
    name: { type: sequelize_1.DataTypes.STRING },
    salary: { type: sequelize_1.DataTypes.INTEGER },
    department: { type: sequelize_1.DataTypes.ENUM(DEPARTMENT.HR, DEPARTMENT.PS) },
}, { timestamps: false });
exports.employeeSchema = joi_1.default.object({
    name: joi_1.default.string().alphanum().min(1).max(200).required(),
    salary: joi_1.default.number().integer().min(0).strict(true).required(),
    department: joi_1.default.string()
        .valid(...Object.values(DEPARTMENT))
        .required(),
}).unknown(false);
