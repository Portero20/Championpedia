const express = require('express');
const app = express();
const { port, start } = require("./modules/port");
const bodyParser = require('body-parser');
const cors = require("cors");

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.listen(port, start);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/database", require("./routes/database.routes"));
app.use("/article", require("./routes/articles.routes"));
app.use("/search", require("./routes/search.routes"));
app.use("/token", require("./routes/token.routes"));