const { Router } = require("express")
const router = Router()
const articlesControllers = require("../controllers/articles.controllers")
const articlePlayersMiddlewares = require("../middlewares/articlePlayers.middleware")
const articleTeamsMiddlewares = require("../middlewares/articleTeams.middleware")
const articleTrophiesMiddlewares = require("../middlewares/articleTrophies.middleware")

router.post("/futbolistas/create", articlePlayersMiddlewares, articlesControllers.create)
router.post("/equipos/create", articleTeamsMiddlewares, articlesControllers.create)
router.post("/copas/create", articleTrophiesMiddlewares, articlesControllers.create)
router.get("/categories", articlesControllers.categories)
router.get("/:category/:id", articlesControllers.detail)
router.get("/images", articlesControllers.images)

module.exports = router