const API_KEY = process.env.API_KEY

function verificarApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (API_KEY === apiKey) {
        next();
    } else {
        res.status(401).json({ error: 'API key no válida' });
    }
}

module.exports = { verificarApiKey };