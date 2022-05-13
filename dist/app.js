"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const employee_1 = __importDefault(require("./routes/employee"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use("/employee", employee_1.default);
models_1.db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
app.listen(3000);
