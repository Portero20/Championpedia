const { Router } = require("express")
const router = Router()
// Controlador de articulos
const articlesControllers = require("../controllers/articles.controllers")
// Middlewares crear articulos
const articlePlayersMiddlewares = require("../middlewares/articlePlayers.middleware")
const articleTeamsMiddlewares = require("../middlewares/articleTeams.middleware")
const articleTrophiesMiddlewares = require("../middlewares/articleTrophies.middleware")
// Middlewares editar articulos
const editPlayersMiddlewares = require("../middlewares/editPlayers.middleware"); 
const editTeamsMiddlewares = require("../middlewares/editTeams.middleware"); 
const editTrophiesMiddlewares = require("../middlewares/editTrophies.middleware"); 

router.post("/futbolistas/create", articlePlayersMiddlewares, articlesControllers.create)
router.post("/equipos/create", articleTeamsMiddlewares, articlesControllers.create)
router.post("/copas/create", articleTrophiesMiddlewares, articlesControllers.create)
router.get("/categories", articlesControllers.categories)
router.get("/:category/:id", articlesControllers.detail)
router.get("/images", articlesControllers.images)
router.post("/edit/futbolistas", editPlayersMiddlewares, articlesControllers.edit)
router.post("/edit/equipos", editTeamsMiddlewares, articlesControllers.edit)
router.post("/edit/copas", editTrophiesMiddlewares, articlesControllers.edit)

module.exports = router