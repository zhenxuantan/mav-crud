import express, { ErrorRequestHandler } from "express";
import { json } from "body-parser";
import employeeRoutes from "./routes/employee";
import { db } from "./models";
import { invalidSite } from "./controllers/employee";

const app = express();
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ errorMessage: "Server error!" });
};
app.use(json());
app.use("/employee", employeeRoutes);
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
app.use(errorHandler);
app.get("*", invalidSite);
app.listen(3001);
