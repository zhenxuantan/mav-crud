"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_1 = require("../controllers/employee");
const router = (0, express_1.Router)();
router.post("/", employee_1.createEmp);
router.get("/", employee_1.getAllEmp);
router.get("/:id", employee_1.getEmp);
router.patch("/:id", employee_1.updateEmp);
router.delete("/:id", employee_1.delEmp);
exports.default = router;
