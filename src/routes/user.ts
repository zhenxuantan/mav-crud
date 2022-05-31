import cors from "cors";
import { Router } from "express";
import { createUser, getUser, compareUser, delUser } from "../controllers/user";

const router = Router();
router.use(cors({ origin: "http://localhost:3000" }));
router.post("/:username", compareUser);
router.post("/", createUser);
router.get("/:username?", getUser);
router.patch("/:username", compareUser);
router.delete("/:id", delUser);

export default router;
