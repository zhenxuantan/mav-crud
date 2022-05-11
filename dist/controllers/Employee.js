"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getEmployee = exports.getEmployees = exports.createEmployee = void 0;
const lodash_1 = require("lodash");
const employee_1 = require("../models/employee");
const validation_1 = require("../models/validation");
let ID = 0;
const EMPLOYEES = [];
const createEmployee = (req, res, next) => {
    const input = req.body;
    const validated = validation_1.employeeSchema.validate({ id: ID, ...input });
    if (validated.error) {
        throw new Error("400:" + validated.error);
    }
    else {
        const newEmployee = new employee_1.Employee(ID++, input.name, input.salary, input.department);
        EMPLOYEES.push(newEmployee);
        res.status(200).json(newEmployee);
    }
};
exports.createEmployee = createEmployee;
const getEmployees = (req, res, next) => {
    res.status(200).json({ employees: EMPLOYEES });
};
exports.getEmployees = getEmployees;
const getEmployee = (req, res, next) => {
    const empId = +req.params.id;
    const empIndex = EMPLOYEES.findIndex((emp) => emp.id === empId);
    if (empIndex < 0) {
        throw new Error("404:Could not find employee!");
    }
    res.json(EMPLOYEES[empIndex]);
};
exports.getEmployee = getEmployee;
const updateEmployee = (req, res, next) => {
    const empId = +req.params.id;
    const input = req.body;
    const empIndex = EMPLOYEES.findIndex((emp) => emp.id === empId);
    if (empIndex < 0) {
        throw new Error("404:Could not find employee!");
    }
    const combinedinput = { ...EMPLOYEES[empIndex], ...input };
    const validatedUpdate = validation_1.employeeSchema.validate(combinedinput);
    if (validatedUpdate.error) {
        throw new Error("400:" + validatedUpdate.error);
    }
    else if ((0, lodash_1.isEqual)(combinedinput, { ...EMPLOYEES[empIndex] })) {
        res.sendStatus(304);
    }
    else {
        EMPLOYEES[empIndex] = new employee_1.Employee(combinedinput.id, combinedinput.name, combinedinput.salary, combinedinput.department);
        res.status(200).json(EMPLOYEES[empIndex]);
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res, next) => {
    const empId = +req.params.id;
    const empIndex = EMPLOYEES.findIndex((emp) => emp.id === empId);
    if (empIndex < 0) {
        throw new Error("404:Could not find employee!");
    }
    EMPLOYEES.splice(empIndex, 1);
    res.status(200).json({ message: "Employee deleted!" });
};
exports.deleteEmployee = deleteEmployee;
