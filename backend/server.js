const express = require("express");
const cors = require("cors");
const path = require("path");
const usersRoutes = require("./routes/users");
const songsRoutes = require("./routes/songs");

const authRoutes = require("./routes/auth");
const favoritosRoutes = require("./routes/favoritos");
const conexion = require("./db");

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(express.json());

// Servir los archivos del frontend
const fs = require("fs");
const frontendCandidates = [
    path.join(__dirname, "frontend"),
    path.join(__dirname, "../frontend")
];
const frontendPath = frontendCandidates.find(p => fs.existsSync(p)) || frontendCandidates[0];
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
    res.redirect("/login.html");
});

app.use("/api", authRoutes);
app.use("/api", songsRoutes);
app.use("/api", favoritosRoutes);
app.use("/api/usuarios", usersRoutes);

app.get("/api/prueba", (req, res) => {
    res.json({
        mensaje: "La API funciona correctamente"
    });
});

 

app.get("/test-db", (req, res) => {

    conexion.query("SELECT NOW() AS fecha", (error, resultado) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultado);

    });

});

const PORT = process.env.PORT || 3000;

console.log("Server.js actualizado");

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
});