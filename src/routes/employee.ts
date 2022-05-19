import cors from "cors";
import { Router } from "express";
import { createEmp, delEmp, getEmp, updateEmp } from "../controllers/employee";

const router = Router();
router.use(cors({ origin: "http://localhost:3000" }));
router.post("/", createEmp);
router.get("/", getEmp);
router.get("/:id", getEmp);
router.patch("/:id", updateEmp);
router.delete("/:id", delEmp);

export default router;
