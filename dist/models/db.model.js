"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employees = exports.DEPARTMENT = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../config/db.config");
var DEPARTMENT;
(function (DEPARTMENT) {
    DEPARTMENT["HR"] = "HR";
    DEPARTMENT["PS"] = "PS";
})(DEPARTMENT = exports.DEPARTMENT || (exports.DEPARTMENT = {}));
const sequelize = new sequelize_1.Sequelize(db_config_1.dbConfig.DB, db_config_1.dbConfig.USER, db_config_1.dbConfig.PASSWORD, {
    host: db_config_1.dbConfig.HOST,
    dialect: db_config_1.dbConfig.dialect,
    pool: {
        max: db_config_1.dbConfig.pool.max,
        min: db_config_1.dbConfig.pool.min,
        acquire: db_config_1.dbConfig.pool.acquire,
        idle: db_config_1.dbConfig.pool.idle,
    },
});
exports.Employees = sequelize.define("employees", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING },
    salary: { type: sequelize_1.DataTypes.INTEGER },
    department: { type: sequelize_1.DataTypes.ENUM(DEPARTMENT.HR, DEPARTMENT.PS) },
}, { timestamps: false });
