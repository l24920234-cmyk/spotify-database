/*
=========================================================
            IMPORTACIÓN DE LIBRERÍAS
=========================================================
*/

// Carga las variables de entorno almacenadas en el archivo .env
// Esto permite mantener seguros datos como el usuario,
// contraseña y nombre de la base de datos.
require("dotenv").config();

// Importa la librería mysql2, la cual permite conectar
// la aplicación Node.js con una base de datos MySQL.
const mysql = require("mysql2");

/*
=========================================================
        CREACIÓN DE LA CONEXIÓN A LA BASE DE DATOS
=========================================================
*/

// Se crea una conexión utilizando los datos almacenados
// en el archivo .env.
const conexion = mysql.createConnection({

    // Dirección o nombre del servidor MySQL.
    host: process.env.DB_HOST,

    // Puerto por donde escucha el servidor MySQL.
    port: process.env.DB_PORT,

    // Usuario autorizado para acceder a la base de datos.
    user: process.env.DB_USER,

    // Contraseña del usuario de la base de datos.
    password: process.env.DB_PASSWORD,

    // Nombre de la base de datos que utilizará la aplicación.
    database: process.env.DB_NAME

});


/*
=========================================================
        VERIFICAR LA CONEXIÓN CON MYSQL
=========================================================
*/

// Intenta establecer la conexión con el servidor MySQL.
conexion.connect((error) => {

    // Si ocurre un error durante la conexión,
    // se muestra el mensaje en la consola.
    if (error) {

        console.error("❌ Error al conectar a MySQL:", error);

        // Finaliza la ejecución de la función.
        return;
    }

    // Si la conexión fue exitosa, muestra un mensaje
    // indicando que la aplicación ya está conectada.
    console.log("✅ Conectado a MySQL");

});


/*
=========================================================
        EXPORTAR LA CONEXIÓN
=========================================================
*/

// Exporta el objeto "conexion" para que pueda ser utilizado
// en otros archivos del proyecto, como server.js,
// controladores o rutas.
module.exports = conexion;