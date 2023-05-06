const express = require('express')
const app = express()
const cors = require("cors")
const { port, start } = require("./modules/port")
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.use(cors({
    origin: 'https://front-end.up.railway.app'
    
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/token", require("./routes/token.routes"))
app.use("/article", require("./routes/articles.routes"));
app.use("/search", require("./routes/search.routes"));
app.use("/database", require("./routes/database.routes"));

app.listen(port, start)