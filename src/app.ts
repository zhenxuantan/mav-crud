import express, { ErrorRequestHandler, RequestHandler } from "express";
import { json } from "body-parser";
import employeeRoutes from "./routes/employee";
import userRoutes from "./routes/user";
import { db } from "./models";

const app = express();
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ errorMessage: "Server error!" });
};
export const invalidSite: RequestHandler = (req, res) =>
  res.status(404).json({ errorMessage: "Invalid site!" });
app.use(json());

app.use("/employee", employeeRoutes);
app.use("/auth", userRoutes);
app.use(errorHandler);
app.use("*", invalidSite);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
app.listen(3001, "localhost");
