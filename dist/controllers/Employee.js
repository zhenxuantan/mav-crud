"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delEmp = exports.updateEmp = exports.getEmp = exports.getAllEmp = exports.createEmp = void 0;
const lodash_1 = require("lodash");
const employee_1 = require("../models/employee");
const models_1 = require("../models");
const EMPLOYEES = models_1.db.employees;
const createEmp = (req, res) => {
    const input = req.body;
    const { value, error } = employee_1.employeeSchema.validate(input);
    if (error)
        return res.status(400).json({ errorMessage: error.message });
    EMPLOYEES.create(value).then((data) => {
        res.status(200).json(data);
    });
};
exports.createEmp = createEmp;
const getAllEmp = (req, res) => {
    EMPLOYEES.findAll().then((data) => {
        res.status(200).json({ employees: data });
    });
};
exports.getAllEmp = getAllEmp;
const getEmp = (req, res) => {
    EMPLOYEES.findByPk(+req.params.id)
        .then((data) => {
        if (data)
            return res.status(200).json(data);
        res.status(404).json({ errorMessage: "Could not find employee!" });
    })
        .catch(() => res.status(404).json({ errorMessage: "ID format is wrong!" }));
};
exports.getEmp = getEmp;
const updateEmp = (req, res) => {
    const input = req.body;
    EMPLOYEES.findByPk(+req.params.id).then((data) => {
        if (data) {
            const { id, ...rest } = data.toJSON();
            const { value, error } = employee_1.employeeSchema.validate({
                ...rest,
                ...input,
            });
            if (error) {
                res.status(400).json({ errorMessage: error.message });
            }
            else if ((0, lodash_1.isEqual)(value, rest)) {
                res.sendStatus(304);
            }
            else {
                EMPLOYEES.update(input, {
                    where: { id: +req.params.id },
                }).then(() => {
                    res.status(200).json({ id: +req.params.id, ...value });
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
    })
        .then((num) => {
        if (num >= 1)
            return res.sendStatus(204);
        res.status(404).json({ errorMessage: "Could not find employee!" });
    })
        .catch(() => res.status(404).json({ errorMessage: "ID format is wrong!" }));
};
exports.delEmp = delEmp;
