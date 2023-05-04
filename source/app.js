const express = require('express')
const app = express()
const { port, start } = require("./modules/port")
const bodyParser = require('body-parser');
const cors = require("cors")
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/database", require("./routes/database.routes"));
app.use("/article", require("./routes/articles.routes"), createProxyMiddleware({
    target: 'https://championpedia-production.up.railway.app/',
    changeOrigin: true,
    secure: false,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
    }
}));
app.use("/search", require("./routes/search.routes"), createProxyMiddleware({
    target: 'https://championpedia-production.up.railway.app/',
    changeOrigin: true,
    secure: false,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
    }
}));
app.use("/token", require("./routes/token.routes"), createProxyMiddleware({
    target: 'https://championpedia-production.up.railway.app/',
    changeOrigin: true,
    secure: false,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
    }
}))

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(port, start)







