// ============================================================
// backend/routes/users.js
// CRUD completo sobre la tabla `usuarios`, para el panel de
// administración. Usa el mismo estilo de callbacks que tu db.js
// real (conexion.query(sql, params, callback)).
// ============================================================
 
const express = require("express");
const router = express.Router();
const conexion = require("../db");

console.log("✅ users.js cargado");
 
// ---------- LISTAR TODOS LOS USUARIOS ----------
// GET /api/usuarios
router.get("/", (req, res) => {
     console.log("🎯 SÍ llegó la petición a GET /api/usuarios"); 
  conexion.query(
    "SELECT id, nombre, correo, password, fecha_registro FROM usuarios ORDER BY id ASC",
    (error, rows) => {
      if (error) {
        console.error("Error al listar usuarios:", error);
        return res.status(500).json({ success: false, message: "Error del servidor" });
      }
      return res.json({ success: true, usuarios: rows });
    }
  );
});
 
// ---------- OBTENER UN SOLO USUARIO ----------
// GET /api/usuarios/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  conexion.query(
    "SELECT id, nombre, correo, password, fecha_registro FROM usuarios WHERE id = ? LIMIT 1",
    [id],
    (error, rows) => {
      if (error) {
        console.error("Error al obtener usuario:", error);
        return res.status(500).json({ success: false, message: "Error del servidor" });
      }
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: "Usuario no encontrado" });
      }
      return res.json({ success: true, usuario: rows[0] });
    }
  );
});
 
// ---------- CREAR UN NUEVO USUARIO ----------
// POST /api/usuarios
router.post("/", (req, res) => {
  const { nombre, correo, password } = req.body;
 
  if (!nombre || !correo || !password) {
    return res.status(400).json({ success: false, message: "Nombre, correo y contraseña son obligatorios" });
  }
 
  // Revisamos primero que no exista ya ese correo, para no duplicarlo
  conexion.query(
    "SELECT id FROM usuarios WHERE correo = ? LIMIT 1",
    [correo],
    (error, existentes) => {
      if (error) {
        console.error("Error al validar correo:", error);
        return res.status(500).json({ success: false, message: "Error del servidor" });
      }
      if (existentes.length > 0) {
        return res.status(409).json({ success: false, message: "Ya existe un usuario con ese correo" });
      }
 
      conexion.query(
        "INSERT INTO usuarios (nombre, correo, password, fecha_registro) VALUES (?, ?, ?, NOW())",
        [nombre, correo, password],
        (error2, resultado) => {
          if (error2) {
            console.error("Error al crear usuario:", error2);
            return res.status(500).json({ success: false, message: "Error del servidor" });
          }
          return res.status(201).json({
            success: true,
            message: "Usuario creado correctamente",
            id: resultado.insertId
          });
        }
      );
    }
  );
});
 
// ---------- EDITAR UN USUARIO EXISTENTE ----------
// PUT /api/usuarios/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, correo, password } = req.body;
 
  if (!nombre || !correo || !password) {
    return res.status(400).json({ success: false, message: "Nombre, correo y contraseña son obligatorios" });
  }
 
  conexion.query(
    "UPDATE usuarios SET nombre = ?, correo = ?, password = ? WHERE id = ?",
    [nombre, correo, password, id],
    (error, resultado) => {
      if (error) {
        console.error("Error al editar usuario:", error);
        return res.status(500).json({ success: false, message: "Error del servidor" });
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Usuario no encontrado" });
      }
      return res.json({ success: true, message: "Usuario actualizado correctamente" });
    }
  );
});
 
// ---------- BORRAR UN USUARIO ----------
// DELETE /api/usuarios/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
 
  conexion.query(
    "DELETE FROM usuarios WHERE id = ?",
    [id],
    (error, resultado) => {
      if (error) {
        console.error("Error al borrar usuario:", error);
        return res.status(500).json({ success: false, message: "Error del servidor" });
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Usuario no encontrado" });
      }
      return res.json({ success: true, message: "Usuario eliminado correctamente" });
    }
  );
});
 
module.exports = router;