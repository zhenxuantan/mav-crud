"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
exports.client = new pg_1.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "pw",
    database: "postgres",
});
exports.client.connect();
exports.client
    .query("CREATE TYPE department_state as ENUM('HR', 'PS');" +
    "CREATE TABLE employees (id INT, 'name' VARCHAR(200), salary INT, department department_state);")
    .then((res) => console.log("Table is successfully created"))
    .catch((err) => console.error(err))
    .finally(() => exports.client.end());
