const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { port, start } = require('./modules/port')

// req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// iniciando el servidor
app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(port, start)