import express from "express";
import { json } from "body-parser";
import employeeRoutes from "./routes/employee";

const app = express();
app.use(json());
app.use("/employee", employeeRoutes);
app.listen(3000);
