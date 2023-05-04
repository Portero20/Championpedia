const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { SHARED_SECRET } = require('../modules/config');

module.exports = {
    token: (req, res) => {
        try {
            const token = jwt.sign({}, SHARED_SECRET);
            res.json({ token });

        } catch (error) {
            res.status(500).json({ error: 'Error al generar el token' });
        }
    }
}