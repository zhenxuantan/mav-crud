import { RequestHandler } from "express";
import { loginSchema, user, userLogin, userSchema } from "../models/user";
import { db } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const getUser: RequestHandler = (req, res) => {
  USERS.findAll({
    order: [["id", "asc"]],
    where:
      req.params.username === undefined
        ? {}
        : { username: req.params.username },
  }).then((data) => {
    if (req.params.username)
      return data.length === 1
        ? res.sendStatus(200)
        : res.status(404).json({ errorMessage: "Could not find user!" });
    return res.status(200).json({ users: data });
  });
};

export const compareUser: RequestHandler = (req, res) => {
  const input = req.body as userLogin;
  const { value, error } = loginSchema.validate(input);
  USERS.findOne({ where: { username: input.username } }).then((data) => {
    if (data) {
      const pw = data.toJSON().password;
      return error
        ? res.status(400).json({ errorMessage: error.message })
        : bcrypt.compareSync(value.password, pw)
        ? res.status(200).json({
            token: jwt.sign(
              { username: input.username },
              process.env.SECRET_KEY as string,
              { expiresIn: "2h" }
            ),
          })
        : res.sendStatus(403);
    }
    res.status(404).json({ errorMessage: "Could not find user!" });
  });
};

export const delUser: RequestHandler = (req, res) => {
  if (isNaN(+req.params.id)) return idFormatError(res);
  USERS.destroy({
    where: { id: +req.params.id },
  }).then((num) => {
    if (num >= 1) return res.sendStatus(204);
    res.status(404).json({ errorMessage: "Could not find user!" });
  });
};
