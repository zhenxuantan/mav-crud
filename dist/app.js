"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const employee_1 = __importDefault(require("./routes/employee"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use("/employee", employee_1.default);
app.use((err, req, res, next) => {
    let errCode = 500;
    let errMessage = "Server error!";
    const errArr = err.message.split(":", 2);
    if (err.message.split.length > 1) {
        errCode = +errArr[0];
        errMessage = errArr[1];
    }
    res.status(errCode).json({ errorMessage: errMessage });
});
app.listen(3000);
