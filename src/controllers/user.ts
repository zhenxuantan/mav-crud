import { RequestHandler } from "express";
import { loginSchema, user, userLogin, userSchema } from "../models/user";
import { db } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "./employee";

const USERS = db.users;

const idFormatError = (res: any) =>
  res.status(404).json({
    errorMessage: "The ID format is wrong!",
  });

export const createUser: RequestHandler = (req, res) => {
  const input = req.body as user;
  const { value, error } = userSchema.validate(input);
  value.password = bcrypt.hashSync(value.password);
  if (error) return res.status(400).json({ errorMessage: error.message });
  USERS.create(value).then((data) => {
    res.status(200).json(data);
  });
};

export const compareUser: RequestHandler = (req, res) => {
  const input = req.body as userLogin;
  const { value, error } = loginSchema.validate(input);
  USERS.findOne({ where: { username: input.username } }).then((data) => {
    if (data) {
      const pw = data.toJSON().password;
      if (error) return res.status(400).json({ errorMessage: error.message });
      if (!bcrypt.compareSync(value.password, pw)) return res.sendStatus(403);
      const token = jwt.sign(
        { username: input.username },
        process.env.SECRET_KEY as string,
        { expiresIn: "2h" }
      );
      return res
        .cookie("token", token, { httpOnly: true, maxAge: 7200000 })
        .sendStatus(200);
    }
    res.status(404).json({ errorMessage: "Could not find user!" });
  });
};

export const tokenUser: RequestHandler = (req, res) => {
  if (!verifyToken(req, res)) return res.status(403).send("Need log in.");
  return res.sendStatus(200);
};

export const logoutUser: RequestHandler = (req, res) =>
  res.clearCookie("token").sendStatus(200);
