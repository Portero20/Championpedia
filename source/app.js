const express = require('express')
const app = express()
const { port, start } = require("./modules/port")
const bodyParser = require('body-parser');
const cors = require("cors")

app.get('/', (req, res) => {
    res.send("Hello World!")
})
// iniciando el servidor
app.listen(port, start)

// req.body
app.use(bodyParser.urlencoded({ extended: true })); // para analizar la aplicación/x-www-form-urlencoded
app.use(bodyParser.json()); // para analizar aplicación/json

// Permitir recibir solicitudes de otros dominios
app.use(cors());

app.use("/database", require("./routes/database.routes"));
app.use("/article", require("./routes/articles.routes"));
app.use("/search", require("./routes/search.routes"));
app.use("/token", require("./routes/token.routes"))