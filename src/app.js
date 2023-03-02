import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("FUNCIONA");
});

app.get("/nuevo", function (req, res) {
  res.send("NUEVO FUNCIONA");
});


console.log("Corriendo en el puerto 5000")

app.listen(process.env.PORT || 5000);
export default app;