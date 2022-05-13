"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "pw",
    DB: "postgres",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
