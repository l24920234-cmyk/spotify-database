const express = require("express");
const router = express.Router();
const conexion = require("../db");

// Obtener todas las canciones
router.get("/canciones", (req, res) => {

    conexion.query("SELECT * FROM canciones", (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultado);

    });

});

module.exports = router;