const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const SHARED_SECRET = process.env.SHARED_SECRET;

function verificarToken(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        try {
            jwt.verify(token.split(' ')[1], SHARED_SECRET);
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token inválido' });
        }
    } else {
        res.status(401).json({ error: 'Token requerido' });
    }
}

module.exports = { verificarToken }