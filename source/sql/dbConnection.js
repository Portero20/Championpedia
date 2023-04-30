const mysql = require('mysql');
const dotenv = require('dotenv').config();

let conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
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