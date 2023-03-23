const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const validations = require("../validations/editPlayers")

module.exports = [upload.array("file",  1), validations]