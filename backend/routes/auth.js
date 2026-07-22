const express = require("express");
const router = express.Router();

const conexion = require("../db");

console.log("✅ auth.js cargado");

router.post("/login", (req, res) => {

    console.log("🚀 Entró a /login");
    console.log(req.body);

    const { correo, password } = req.body;

    const sql = `
        SELECT *
        FROM usuarios
        WHERE correo = ? AND password = ?
    `;

    conexion.query(sql, [correo, password], (error, resultado) => {

        if (error) {
            console.log(error);
            return res.status(500).json(error);
        }

        console.log("Resultado de MySQL:", resultado);

        if (resultado.length > 0) {

            return res.json({
                success: true,
                mensaje: "Inicio de sesión correcto",
                usuario: resultado[0]
            });

        }

        res.json({
            success: false,
            mensaje: "Correo o contraseña incorrectos"
        });

    });

});

// =====================================================
// OBTENER TODOS LOS USUARIOS
// =====================================================

router.get("/usuarios", (req, res) => {

    const sql = `
        SELECT
            id,
            nombre,
            correo,
            rol,
            fecha_registro
        FROM usuarios
        ORDER BY id ASC
    `;

    conexion.query(sql, (error, resultado) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                success: false,
                mensaje: "Error al obtener usuarios"
            });

        }

        res.json({
            success: true,
            usuarios: resultado
        });

    });

});

// ===============================================
// EDITAR USUARIO
// ===============================================

router.put("/usuarios/:id", (req, res) => {

    const id = req.params.id;

    const { nombre, correo, rol } = req.body;

    const sql = `
        UPDATE usuarios
        SET nombre = ?, correo = ?, rol = ?
        WHERE id = ?
    `;

    conexion.query(sql, [nombre, correo, rol, id], (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            success: true,
            mensaje: "Usuario actualizado correctamente"
        });

    });

});
// ===============================================
// ELIMINAR USUARIO
// ===============================================

router.delete("/usuarios/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM usuarios
        WHERE id = ?
    `;

    conexion.query(sql, [id], (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            success: true,
            mensaje: "Usuario eliminado correctamente"
        });

    });

});

// ===============================================
// AGREGAR USUARIO
// ===============================================

router.post("/usuarios", (req, res) => {

    const { nombre, correo, password, rol } = req.body;

    const sql = `
        INSERT INTO usuarios
        (nombre, correo, password, rol)
        VALUES (?, ?, ?, ?)
    `;

    conexion.query(

        sql,

        [nombre, correo, password, rol],

        (error, resultado) => {

            if (error) {

                return res.status(500).json(error);

            }

            res.json({

                success: true,

                mensaje: "Usuario agregado correctamente"

            });

        }

    );

});


module.exports = router;

