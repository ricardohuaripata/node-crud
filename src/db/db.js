import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const POOL = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

async function connectDB() {
  try {
    const connection = await POOL.getConnection();
    console.log("DB_NAME: "+process.env.DB_DATABASE);
    console.log("Base de datos conectada :)");
  } catch (error) {
    console.log("No se ha podido conectar con la base de datos :(");
  }
}
connectDB();
