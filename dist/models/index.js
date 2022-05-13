"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sequelize = void 0;
const config_1 = require("../config");
const sequelize_1 = require("sequelize");
const employee_1 = require("./employee");
exports.sequelize = new sequelize_1.Sequelize(config_1.dbConfig.DB, config_1.dbConfig.USER, config_1.dbConfig.PASSWORD, {
    host: config_1.dbConfig.HOST,
    dialect: config_1.dbConfig.dialect,
    pool: {
        max: config_1.dbConfig.pool.max,
        min: config_1.dbConfig.pool.min,
        acquire: config_1.dbConfig.pool.acquire,
        idle: config_1.dbConfig.pool.idle,
    },
});
exports.db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize: exports.sequelize,
    employees: employee_1.Employees,
};
