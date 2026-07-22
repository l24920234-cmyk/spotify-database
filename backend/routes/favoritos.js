const express = require("express");
const router = express.Router();
const conexion = require("../db");

// Obtener favoritos de un usuario
router.get("/favoritos/:usuarioId", (req, res) => {

    const usuarioId = req.params.usuarioId;

    const sql = `
        SELECT canciones.*
        FROM favoritos
        INNER JOIN canciones
        ON favoritos.cancion_id = canciones.id
        WHERE favoritos.usuario_id = ?
    `;

    conexion.query(sql, [usuarioId], (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultado);

    });
    

});
// Agregar un favorito
router.post("/favoritos", (req, res) => {

    const { usuario_id, cancion_id } = req.body;

    const sql = `
        INSERT INTO favoritos (usuario_id, cancion_id)
        VALUES (?, ?)
    `;

    conexion.query(sql, [usuario_id, cancion_id], (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: "Favorito agregado correctamente"
        });

    });

});

module.exports = router;