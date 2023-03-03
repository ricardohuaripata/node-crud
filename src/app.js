//importar modulos
//const express = require("express");
import express from "express";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/router.js";
import dotenv from "dotenv";
import { POOL } from "./db/db.js";
import bodyParser from "body-parser";

import session from "express-session";

//configurar variables de entorno
dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 8080;

//configurar el motor de plantillas
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//crear el servidor
app.listen(port);
console.log("El servidor esta escuchando en el puerto ", port);

//usar router
app.use(indexRoutes);

//usar sesiones
app.use(
    session({
        secret: '12345',
        resave: true,
        saveUninitialized: true
    })
)

// configurar carpeta public para contenido estatico

app.use(express.static(path.join(__dirname, "public")));
