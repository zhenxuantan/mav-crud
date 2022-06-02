import express, { ErrorRequestHandler, RequestHandler } from "express";
import { json } from "body-parser";
import employeeRoutes from "./routes/employee";
import userRoutes from "./routes/user";
import { db } from "./models";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ errorMessage: String(err) });
};
export const invalidSite: RequestHandler = (req, res) =>
  res.status(404).json({ errorMessage: "Invalid site!" });

const init: RequestHandler = (_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
};

const PORT = process.env.PORT || 3010;
app.use(json());
app.use(init);
app.use(cookieParser());
app.use("/auth", userRoutes);
app.use("/employee", employeeRoutes);
app.use(errorHandler);
app.use("*", invalidSite);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
app.listen(PORT);
