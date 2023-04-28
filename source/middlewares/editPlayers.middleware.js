const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const validations = require("../validations/editPlayers")

// Middleware autenticar Token
const { verificarToken } = require("../middlewares/verifyToken.middleware")

module.exports = [verificarToken, upload.array("file",  1), validations]