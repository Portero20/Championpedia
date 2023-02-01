const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const { port, start } = require('./modules/port')

// Permitir recibir solicitudes de otros dominios
app.use(cors())

// req.body
app.use(bodyParser.json()); // para analizar aplicación/json
app.use(bodyParser.urlencoded({ extended: false })); // para analizar la aplicación/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send("Hello World!")
})

// iniciando el servidor
app.listen(port, start)

app.use("/database", require("./routes/database.routes"))