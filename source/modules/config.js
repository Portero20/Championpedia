const PORT = process.env.PORT || 3000

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_NAME = process.env.DB_NAME || 'championpedia'
const DB_PORT = process.env.DB_PORT || 3306
const SHARED_SECRET = process.env.SHARED_SECRET
const API_KEY =  process.env.API_KEY

module.exports = { PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_HOST, SHARED_SECRET, API_KEY }