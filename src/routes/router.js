import { Router } from "express";
import session from "express-session";
import {
  vistaHome,
  vistaLogin,
  vistaRegistro,
  vistaAdmin,
  vistaEditarProducto,
  vistaCrearProducto,
  registrarUsuario,
  editarProducto,
  eliminarProducto,
  crearProducto,
  iniciarSesion

} from "../controllers/indexRoutes.js";
//siempre que hagamos un import hay que añadir la extension del archivo

const router = Router();

//usar sesiones
router.use(
  session({
      secret: '12345',
      resave: true,
      saveUninitialized: true
  })
)

//crear rutas
router.get("/", vistaHome);
router.get("/login", vistaLogin);
router.get("/registro", vistaRegistro);
router.get("/admin", vistaAdmin);
router.get("/editar-producto/:id", vistaEditarProducto);
router.get("/crear-producto", vistaCrearProducto);

router.post("/registrarNuevoUsuario", registrarUsuario);
//router.post("/iniciarSesionUsuario", iniciarSesion);

router.post("/producto/update", editarProducto);
router.post("/producto/create", crearProducto);
router.get("/producto/delete/:id", eliminarProducto);

//module.exports = router
export default router;
