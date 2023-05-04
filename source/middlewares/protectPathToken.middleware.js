const dotenv = require('dotenv').config();
const { API_KEY } = require('../modules/config')

function verificarApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (API_KEY === apiKey) {
        next();
    } else {
        res.status(401).json({ error: 'API key no válida' });
    }
}

module.exports = { verificarApiKey };