"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delEmp = exports.updateEmp = exports.getEmp = exports.getAllEmp = exports.createEmp = void 0;
const lodash_1 = require("lodash");
const validation_1 = require("../models/validation");
const models_1 = require("../models");
const EMPLOYEES = models_1.db.employees;
let ID = 0;
const createEmp = (req, res) => {
    const input = req.body;
    const { value, error } = validation_1.employeeSchema.validate({ id: ID, ...input });
    if (error) {
        res.status(400).json({ errorMessage: error });
    }
    else {
        EMPLOYEES.create({ ...value, id: ID++ }).then((data) => {
            res.status(200).json(data);
        });
    }
};
exports.createEmp = createEmp;
const getAllEmp = (req, res) => {
    EMPLOYEES.findAll().then((data) => {
        res.status(200).json({ employees: data });
    });
};
exports.getAllEmp = getAllEmp;
const getEmp = (req, res) => {
    EMPLOYEES.findByPk(+req.params.id).then((data) => {
        if (data)
            return res.status(200).json(data);
        res.status(404).json({ errorMessage: "Could not find employee!" });
    });
};
exports.getEmp = getEmp;
const updateEmp = (req, res) => {
    const input = req.body;
    EMPLOYEES.findByPk(+req.params.id).then((data) => {
        if (data) {
            const { value, error } = validation_1.employeeSchema.validate({
                ...data.toJSON(),
                ...input,
            });
            if (error) {
                res.status(400).json(value);
            }
            else if ((0, lodash_1.isEqual)(value, data.toJSON())) {
                res.sendStatus(304);
            }
            else {
                EMPLOYEES.update(input, {
                    where: { id: +req.params.id },
                }).then(() => {
                    res.status(200).json(value);
                });
            }
        }
        else {
            res.status(404).json({ errorMessage: "Could not find employee!" });
        }
    });
};
exports.updateEmp = updateEmp;
const delEmp = (req, res) => {
    EMPLOYEES.destroy({
        where: { id: +req.params.id },
    }).then((num) => {
        if (num == 1)
            return res.sendStatus(204);
        res.status(404).json({ errorMessage: "Could not find employee!" });
    });
};
exports.delEmp = delEmp;
