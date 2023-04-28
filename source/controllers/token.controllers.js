const jwt = require('jsonwebtoken');

const SHARED_SECRET = process.env.SHARED_SECRET;

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