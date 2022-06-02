import { Router } from "express";
import {
  createUser,
  compareUser,
  tokenUser,
  logoutUser,
} from "../controllers/user";

const router = Router();
router.post("/login", compareUser);
router.post("/logout", logoutUser);
router.post("/", createUser);
router.get("/token", tokenUser);

export default router;
