import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

import employeeRoutes from "./routes/employee";

const app = express();

app.use(json());

app.use("/employee", employeeRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let errCode = 500;
  let errMessage = "Server error!";
  const errArr: string[] = err.message.split(":", 2);
  if (err.message.split.length > 1) {
    errCode = +errArr[0];
    errMessage = errArr[1];
  }
  res.status(errCode).json({ errorMessage: errMessage });
});

app.listen(3000);
