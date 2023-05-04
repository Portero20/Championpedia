const dotenv = require('dotenv').config();

module.exports = {
    port: process.env.PORT || 10000,
    start: () => console.log(`Server running on port ${process.env.PORT}`)
}