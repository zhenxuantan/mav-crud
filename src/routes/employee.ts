import { Router } from "express";

import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employee";

const router = Router();

router.post("/", createEmployee);

router.get("/", getEmployees);

router.get("/:id", getEmployee);

router.patch("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

export default router;
