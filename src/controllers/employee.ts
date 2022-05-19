import { RequestHandler } from "express";
import { isEqual } from "lodash";
import { employee, employeeSchema } from "../models/employee";
import { db } from "../models";

const EMPLOYEES = db.employees;

const serverError = (res: any) =>
  res.status(500).json({
    errorMessage: "The server has an error!",
  });

const idFormatError = (res: any) =>
  res.status(404).json({
    errorMessage: "The ID format is wrong!",
  });

export const createEmp: RequestHandler = (req, res) => {
  const input = req.body as employee;
  const { value, error } = employeeSchema.validate(input);
  if (error) return res.status(400).json({ errorMessage: error.message });
  EMPLOYEES.create(value)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => serverError(res));
};

export const getEmp: RequestHandler = (req, res) => {
  if (req.params.id) {
    EMPLOYEES.findByPk(+req.params.id)
      .then((data) => {
        if (data) return res.status(200).json(data);
        res.status(404).json({ errorMessage: "Could not find employee!" });
      })
      .catch(() => (+req.params.id ? serverError(res) : idFormatError(res)));
  } else {
    EMPLOYEES.findAll({ order: [["id", "asc"]] })
      .then((data) => {
        res.status(200).json({ employees: data });
      })
      .catch(() => serverError(res));
  }
};

export const updateEmp: RequestHandler = (req, res) => {
  const input = req.body as employee;
  EMPLOYEES.findByPk(+req.params.id)
    .then((data) => {
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
    })
    .catch(() => (+req.params.id ? serverError(res) : idFormatError(res)));
};

export const delEmp: RequestHandler = (req, res) => {
  EMPLOYEES.destroy({
    where: { id: +req.params.id },
  })
    .then((num) => {
      if (num >= 1) return res.sendStatus(204);
      res.status(404).json({ errorMessage: "Could not find employee!" });
    })
    .catch(() => (+req.params.id ? serverError(res) : idFormatError(res)));
};

export const invalidSite: RequestHandler = (req, res) =>
  res.status(404).json({ errorMessage: "Invalid site!" });
