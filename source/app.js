const express = require('express')
const app = express()
const {port, start} = require('./modules/port')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(port, start)