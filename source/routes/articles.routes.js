const { Router } = require("express")
const router = Router()
const articlesControllers = require("../controllers/articles.controllers")
const articleCreateMiddleware = require("../middlewares/articleCreate.middleware")

router.post("/create", articleCreateMiddleware, articlesControllers.create)

module.exports = router