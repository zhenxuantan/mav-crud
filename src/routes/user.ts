import { Router } from "express";
import {
  createUser,
  getUser,
  compareUser,
  delUser,
  tokenUser,
  logoutUser,
} from "../controllers/user";

const router = Router();
router.post("/login", compareUser);
router.post("/logout", logoutUser);
router.post("/", createUser);
router.get("/token", tokenUser);
router.get("/:username?", getUser);
router.patch("/:username", compareUser);
router.delete("/:id", delUser);

export default router;
