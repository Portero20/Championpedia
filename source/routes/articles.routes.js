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

// Middleware autenticar Token
const { verificarToken } = require("../middlewares/verifyToken.middleware")

router.post("/futbolistas/create", articlePlayersMiddlewares, articlesControllers.create)
router.post("/equipos/create", articleTeamsMiddlewares, articlesControllers.create)
router.post("/copas/create", articleTrophiesMiddlewares, articlesControllers.create)
router.get("/categories", verificarToken, articlesControllers.categories)
router.get("/last/:category/:size", verificarToken, articlesControllers.lastArticles)
router.post("/delete/:category/:id", verificarToken, articlesControllers.delete)
router.get("/:category/:id", verificarToken, articlesControllers.detail)
router.post("/edit/futbolistas", editPlayersMiddlewares, articlesControllers.edit)
router.post("/edit/equipos", editTeamsMiddlewares, articlesControllers.edit)
router.post("/edit/copas", editTrophiesMiddlewares, articlesControllers.edit)
router.post("/view", verificarToken, articlesControllers.view)
router.get("/last", verificarToken, articlesControllers.last)
router.get("/moreViews", verificarToken, articlesControllers.moreViews)
router.get("/news", verificarToken, articlesControllers.news)
router.get("/more/:category/views", verificarToken, articlesControllers.viewsCategory)

module.exports = router