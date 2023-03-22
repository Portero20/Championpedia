const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const validations = require("../validations/createTeams")

module.exports = [upload.single("file"), validations]
