import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "pw",
  database: "postgres",
  port: 5432,
});
