const multer = require("multer")
const storage = require("../modules/storage")
const upload = multer({ storage: storage("/articles") })

module.exports = [upload.any()]