import { POOL } from "../db/db.js";
import bcrypt from 'bcrypt'; // hashear password
import session from "express-session";

export const vistaHome = (req, res) => {
  res.render("index", { title: "Inicio", req: req });
};

export const vistaLogin = (req, res) => {
  res.render("login", { title: "Login", req: req, mensajeError: null });
};

export const vistaRegistro = (req, res) => {
  res.render("registro", { title: "Registro", req: req, mensajeError: null });
};

export const vistaCrearProducto = (req, res) => {
  res.render("crear-producto", { title: "Crear producto", req: req });
};


export const vistaEditarProducto = async (req, res) => {
  const id = req.params.id;
  let connection;

  try {
    connection = await POOL.getConnection();
    //comprobar si exite el producto
    const [rows, fields] = await connection.query('SELECT * FROM Productos WHERE id = ?', [id]);

    if (rows.length === 0) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.render('editar-producto', { title: 'Editar producto', req: req, producto: rows[0] });
    }
  } catch (error) {
    console.error('Error al obtener el producto: ', error);
    res.status(500).send("Error al obtener el producto");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};


export const vistaAdmin = async (req, res) => {
  let connection;

  try {
    connection = await POOL.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM Productos');
    res.render('admin', { title: 'Admin', req: req, productos: rows });
  } catch (error) {
    console.error('Error al obtener la lista de productos: ', error);
    res.status(500).send("Error al obtener la lista de productos");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const registrarUsuario = async (req, res) => {
  const { username, password, firstname, lastname, email } = req.body;
  let connection;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // encriptar contraseña
    connection = await POOL.getConnection();
    const [result] = await connection.query('INSERT INTO Usuarios (username, password, firstname, lastname, email) VALUES (?, ?, ?, ?, ?)', [username, hashedPassword, firstname, lastname, email]);
    console.log(result);
    res.redirect('/login');
  } catch (error) {
    console.error('Error al registrar usuario: ', error);
    res.render("registro", { title: "Registro", req: req, mensajeError: error.sqlMessage });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Vista para crear un producto
export const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, existencias } = req.body;
  let connection;

  try {
    connection = await POOL.getConnection();
    const [result] = await connection.query('INSERT INTO Productos (nombre, descripcion, precio, existencias) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, existencias]);
    console.log(result);
    res.redirect('/admin');
  } catch (error) {
    console.error('Error al añadir el producto: ', error);
    res.status(500).send("Error al añadir el producto");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Vista para editar un producto
export const editarProducto = async (req, res) => {
  const { id, nombre, descripcion, precio, existencias } = req.body;
  let connection;

  try {
    connection = await POOL.getConnection();
    const [result] = await connection.query('UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, existencias = ? WHERE id = ?', [nombre, descripcion, precio, existencias, id]);
    console.log(result);
    res.redirect('/admin');
  } catch (error) {
    console.error('Error al editar el producto: ', error);
    res.status(500).send("Error al editar el producto");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Función para eliminar un producto
export const eliminarProducto = async (req, res) => {
  const id = req.params.id;
  let connection;

  try {
    connection = await POOL.getConnection();
    const [result] = await connection.query('DELETE FROM Productos WHERE id = ?', [id]);
    console.log(result);
    res.redirect('/admin');
  } catch (error) {
    console.error('Error al eliminar el producto: ', error);
    res.status(500).send("Error al eliminar el producto");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const iniciarSesion = async (req, res) => {
  const { username, password } = req.body;
  let connection;

  try {
    connection = await POOL.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM Usuarios WHERE username = ?', [username]);
    console.log(rows);

    const user = rows[0];

    if (!user) {
      // El usuario no existe
      res.render("login", { title: "Login", req: req, mensajeError: 'Usuario o contraseña incorrectos' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // La contraseña es incorrecta
      res.render("login", { title: "Login", req: req, mensajeError: 'Usuario o contraseña incorrectos' });
      return;
    }

    console.log("El usuario es valido");
    // El usuario y la contraseña son válidos, guardar el nombre de usuario en la sesión
    req.session.username = user.username;
    res.redirect('/');

  } catch (error) {
    console.error('Error al iniciar sesión: ', error);
    res.status(500).send("Error al iniciar sesión");
  } finally {
    if (connection) {
      connection.release();
    }
  }

};