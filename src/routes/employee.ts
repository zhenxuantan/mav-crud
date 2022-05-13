import { Router } from "express";

import {
  createEmp,
  delEmp,
  getEmp,
  getAllEmp,
  updateEmp,
} from "../controllers/employee";

const router = Router();
router.post("/", createEmp);
router.get("/", getAllEmp);
router.get("/:id", getEmp);
router.patch("/:id", updateEmp);
router.delete("/:id", delEmp);

export default router;
