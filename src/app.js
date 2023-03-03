import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", function (req, res) {
  res.send("FUNCIONA");
});

app.get("/nuevo", function (req, res) {
  res.send("NUEVO FUNCIONA");
});


console.log("Corriendo en el puerto 5000")

app.listen(process.env.PORT || 4000);
console.log(process.env.PORT)

export default app;