const mysql = require('mysql');
const dotenv = require('dotenv').config();

let conexion = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

conexion.connect(function (err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId)
    
    conexion.query('SET GLOBAL max_allowed_packet=20971520', (error, results) => {
        if (error) {
            console.error('Error al establecer max_allowed_packet: ', error);
            return;
        }
    });
})

module.exports = conexion