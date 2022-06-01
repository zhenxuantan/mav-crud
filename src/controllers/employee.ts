import { RequestHandler } from "express";
import { isEqual } from "lodash";
import { employee, employeeSchema } from "../models/employee";
import { db } from "../models";
import jwt from "jsonwebtoken";

const EMPLOYEES = db.employees;

const idFormatError = (res: any) =>
  res.status(404).json({
    errorMessage: "The ID format is wrong!",
  });

export const verifyToken = (req: any, res: any) => {
  const token = req.headers["x-access-token"];
  try {
    jwt.verify(token as string, process.env.SECRET_KEY as string);
    return true;
  } catch (err) {
    return false;
  }
};

export const createEmp: RequestHandler = (req, res) => {
  if (!verifyToken(req, res)) return res.status(403).send("Need log in.");
  const input = req.body as employee;
  const { value, error } = employeeSchema.validate(input);
  if (error) return res.status(400).json({ errorMessage: error.message });
  EMPLOYEES.create(value).then((data) => {
    res.status(200).json(data);
  });
};

export const getEmp: RequestHandler = (req, res) => {
  if (!verifyToken(req, res)) return res.status(403).send("Need log in.");
  if (req.params.id && isNaN(+req.params.id)) return idFormatError(res);
  EMPLOYEES.findAll({
    order: [["id", "asc"]],
    where: req.params.id === undefined ? {} : { id: +req.params.id },
  }).then((data) => {
    if (req.params.id)
      return data.length === 1
        ? res.status(200).json(data[0])
        : res.status(404).json({ errorMessage: "Could not find employee!" });
    return res.status(200).json({ employees: data });
  });
};

export const updateEmp: RequestHandler = (req, res) => {
  if (!verifyToken(req, res)) return res.status(403).send("Need log in.");
  const input = req.body as employee;
  if (isNaN(+req.params.id)) return idFormatError(res);
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
  if (!verifyToken(req, res)) return res.status(403).send("Need log in.");
  if (isNaN(+req.params.id)) return idFormatError(res);
  EMPLOYEES.destroy({
    where: { id: +req.params.id },
  }).then((num) => {
    if (num >= 1) return res.sendStatus(204);
    res.status(404).json({ errorMessage: "Could not find employee!" });
  });
};
