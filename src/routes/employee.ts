import { Router } from "express";
import { createEmp, delEmp, getEmp, updateEmp } from "../controllers/employee";

const router = Router();
router.post("/", createEmp);
router.get("/:id?", getEmp);
router.patch("/:id", updateEmp);
router.delete("/:id", delEmp);

export default router;
