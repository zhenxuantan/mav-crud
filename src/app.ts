import express from "express";
import { json } from "body-parser";
import employeeRoutes from "./routes/employee";
import { db } from "./models";

const app = express();
app.use(json());
app.use("/employee", employeeRoutes);
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
app.listen(3000);
