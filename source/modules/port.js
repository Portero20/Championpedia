const dotenv = require('dotenv').config();
// const { PORT } = require('../modules/config')

module.exports = {
    port: process.env.PORT || 3000,
    start: () => console.log(`Server running on port ${process.env.PORT}`)
}