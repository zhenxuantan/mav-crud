import { RequestHandler } from "express";
import { isEqual } from "lodash";
import { pool } from "../config";
import { employee, employeeSchema } from "../models/employee";

export const createEmp: RequestHandler = (req, res) => {
  const input = req.body as employee;
  const { value, error } = employeeSchema.validate(input);
  if (error) return res.status(400).json({ errorMessage: error.message });
  pool
    .query(
      "INSERT INTO employees (name, salary, department) VALUES ($1, $2, $3) RETURNING id",
      [value.name, value.salary, value.department]
    )
    .then((data) => res.status(200).json({ ...data.rows[0], ...value }));
};

export const getAllEmp: RequestHandler = (req, res) => {
  pool
    .query("SELECT * FROM employees ORDER BY id ASC")
    .then((data) => res.status(200).json({ employees: data.rows }));
};

export const getEmp: RequestHandler = (req, res) => {
  pool
    .query("SELECT * from employees WHERE id = $1", [+req.params.id])
    .then((data) => {
      if (data.rowCount) {
        res.status(200).json(data.rows[0]);
      } else {
        throw new Error();
      }
    })
    .catch((err) =>
      res.status(404).json({ errorMessage: "Could not find employee!" })
    );
};

export const updateEmp: RequestHandler = (req, res) => {
  const input = req.body as employee;
  pool
    .query("SELECT * from employees WHERE id = $1", [+req.params.id])
    .then((data) => {
      const { id, ...rest } = data.rows[0];
      const { value, error } = employeeSchema.validate({
        ...rest,
        ...input,
      });
      if (error) {
        res.status(400).json({ errorMessage: error.message });
      } else if (isEqual(value, rest)) {
        res.sendStatus(304);
      } else {
        pool
          .query(
            "UPDATE employees SET name = $1, salary = $2, department = $3 WHERE id = $4",
            [value.name, value.salary, value.department, +req.params.id]
          )
          .then((data) => res.status(200).json({ id: id, ...value }));
      }
    })
    .catch((err) =>
      res.status(404).json({ errorMessage: "Could not find employee!" })
    );
};

export const delEmp: RequestHandler = (req, res) => {
  pool
    .query("DELETE from employees WHERE id = $1", [+req.params.id])
    .then((data) => {
      if (data.rowCount) {
        res.sendStatus(204);
      } else {
        throw new Error();
      }
    })
    .catch((_err) =>
      res.status(404).json({ errorMessage: "Could not find employee!" })
    );
};
