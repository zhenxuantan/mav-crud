import { RequestHandler } from "express";
import { isEqual } from "lodash";
import { employee, employeeSchema } from "../models/employee";
import { db } from "../models";

const EMPLOYEES = db.employees;

export const createEmp: RequestHandler = (req, res) => {
  const input = req.body as employee;
  const { value, error } = employeeSchema.validate(input);
  if (error) return res.status(400).json({ errorMessage: error.message });
  EMPLOYEES.create(value).then((data) => {
    res.status(200).json(data);
  });
};

export const getAllEmp: RequestHandler = (req, res) => {
  EMPLOYEES.findAll().then((data) => {
    res.status(200).json({ employees: data });
  });
};

export const getEmp: RequestHandler = (req, res) => {
  EMPLOYEES.findByPk(+req.params.id)
    .then((data) => {
      if (data) return res.status(200).json(data);
      res.status(404).json({ errorMessage: "Could not find employee!" });
    })
    .catch(() => res.status(404).json({ errorMessage: "ID format is wrong!" }));
};

export const updateEmp: RequestHandler = (req, res) => {
  const input = req.body as employee;
  EMPLOYEES.findByPk(+req.params.id).then((data) => {
    if (data) {
      const { id, ...rest } = data.toJSON();
      const { value, error } = employeeSchema.validate({
        ...rest,
        ...input,
      });
      if (error) {
        res.status(400).json({ errorMessage: error.message });
      } else if (isEqual(value, rest)) {
        res.sendStatus(304);
      } else {
        EMPLOYEES.update(input, {
          where: { id: +req.params.id },
        }).then(() => {
          res.status(200).json({ id: +req.params.id, ...value });
        });
      }
    } else {
      res.status(404).json({ errorMessage: "Could not find employee!" });
    }
  });
};

export const delEmp: RequestHandler = (req, res) => {
  EMPLOYEES.destroy({
    where: { id: +req.params.id },
  })
    .then((num) => {
      if (num >= 1) return res.sendStatus(204);
      res.status(404).json({ errorMessage: "Could not find employee!" });
    })
    .catch(() => res.status(404).json({ errorMessage: "ID format is wrong!" }));
};
