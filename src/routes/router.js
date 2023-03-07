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
    secret: "36ED3",
    resave: true,
    saveUninitialized: true,
  })
)

// Middleware para verificar si el usuario ha iniciado sesión
const requireLogin = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/login');
  }
}

//crear rutas

router.get("/login", vistaLogin);
router.get("/registro", vistaRegistro);

router.post("/registrarNuevoUsuario", registrarUsuario);
router.post("/iniciarSesionUsuario", iniciarSesion);

router.get("/", vistaHome);
router.get("/admin", requireLogin, vistaAdmin);
router.get("/editar-producto/:id", requireLogin, vistaEditarProducto);
router.get("/crear-producto", requireLogin, vistaCrearProducto);

router.post("/producto/update", requireLogin, editarProducto);
router.post("/producto/create", requireLogin, crearProducto);
router.get("/producto/delete/:id", requireLogin, eliminarProducto);

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

//module.exports = router
export default router;
