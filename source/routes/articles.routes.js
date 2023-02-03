const { Router } = require("express")
const router = Router()
const articlesControllers = require("../controllers/articles.controllers")
const articleCreateMiddleware = require("../middlewares/articleCreate.middleware")

router.post("/create", articleCreateMiddleware, articlesControllers.create)
router.get("/categories", articlesControllers.categories)

module.exports = router