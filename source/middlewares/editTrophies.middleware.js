const multer = require("multer")
const storage = require("../modules/storage")
const upload = multer({ storage: storage("/articles") })
const validations = require("../validations/editThophies")

module.exports = [upload.any(), validations]