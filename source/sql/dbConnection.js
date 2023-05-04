const mysql = require('mysql');
const dotenv = require('dotenv').config();
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } = require('../modules/config');

let conexion = mysql.createConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
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