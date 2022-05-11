import { RequestHandler } from "express";

import { isEqual } from "lodash";

import { Employee, DEPARTMENT } from "../models/employee";

import { employeeSchema } from "../models/validation";

let ID: number = 0;
const EMPLOYEES: Employee[] = [];

export const createEmployee: RequestHandler = (req, res, next) => {
  const input = req.body as {
    name: string;
    salary: number;
    department: DEPARTMENT;
  };

  const validated = employeeSchema.validate({ id: ID, ...input });

  if (validated.error) {
    throw new Error("400:" + validated.error);
  } else {
    const newEmployee = new Employee(
      ID++,
      input.name,
      input.salary,
      input.department
    );
    EMPLOYEES.push(newEmployee);
    res.status(200).json(newEmployee);
  }
};

export const getEmployees: RequestHandler = (req, res, next) => {
  res.status(200).json({ employees: EMPLOYEES });
};

export const getEmployee: RequestHandler<{ id: string }> = (req, res, next) => {
  const empId = +req.params.id;
  const empIndex = EMPLOYEES.findIndex((emp) => emp.id === empId);
  if (empIndex < 0) {
    throw new Error("404:Could not find employee!");
  }
  res.json(EMPLOYEES[empIndex]);
};

export const updateEmployee: RequestHandler<{ id: string }> = (
  req,
  res,
  next
) => {
  const empId = +req.params.id;

  const input = req.body as {
    name: string;
    salary: number;
    department: DEPARTMENT;
  };

  const empIndex = EMPLOYEES.findIndex((emp) => emp.id === empId);

  if (empIndex < 0) {
    throw new Error("404:Could not find employee!");
  }

  const combinedinput = { ...EMPLOYEES[empIndex], ...input };
  const validatedUpdate = employeeSchema.validate(combinedinput);

  if (validatedUpdate.error) {
    throw new Error("400:" + validatedUpdate.error);
  } else if (isEqual(combinedinput, { ...EMPLOYEES[empIndex] })) {
    res.sendStatus(304);
  } else {
    EMPLOYEES[empIndex] = new Employee(
      combinedinput.id,
      combinedinput.name,
      combinedinput.salary,
      combinedinput.department
    );

    res.status(200).json(EMPLOYEES[empIndex]);
  }
};

export const deleteEmployee: RequestHandler = (req, res, next) => {
  const empId = +req.params.id;

  const empIndex = EMPLOYEES.findIndex((emp) => emp.id === empId);

  if (empIndex < 0) {
    throw new Error("404:Could not find employee!");
  }

  EMPLOYEES.splice(empIndex, 1);

  res.status(200).json({ message: "Employee deleted!" });
};
