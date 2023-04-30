const { Router } = require("express")
const router = Router()

const createController = require("../controllers/articles/create")
const detailController = require("../controllers/articles/detail")
const editController = require("../controllers/articles/edit")
const categoryController = require("../controllers/articles/category")
const lastController = require("../controllers/articles/last")
const viewController = require("../controllers/articles/view")
const moreViewController = require("../controllers/articles/moreView")
const newController = require("../controllers/news/new")
const articleLastController = require("../controllers/articles/lastArticle")
const viewCategory = require("../controllers/articles/viewCategory")
const deleteController = require("../controllers/articles/delete")

const { verificarToken } = require("../middlewares/verifyToken.middleware")

const articlePlayersMiddlewares = require("../middlewares/articlePlayers.middleware")
const articleTeamsMiddlewares = require("../middlewares/articleTeams.middleware")
const articleTrophiesMiddlewares = require("../middlewares/articleTrophies.middleware")

const editPlayersMiddlewares = require("../middlewares/editPlayers.middleware"); 
const editTeamsMiddlewares = require("../middlewares/editTeams.middleware"); 
const editTrophiesMiddlewares = require("../middlewares/editTrophies.middleware"); 

router.post("/futbolistas/create", articlePlayersMiddlewares, createController.create)
router.post("/equipos/create", articleTeamsMiddlewares, createController.create)
router.post("/copas/create", articleTrophiesMiddlewares, createController.create)
router.get("/categories", verificarToken, categoryController.categories)
router.get("/last/:category/:size", verificarToken, articleLastController.lastArticles)
router.post("/delete/:category/:id", verificarToken, deleteController.delete)
router.get("/:category/:id", verificarToken, detailController.detail)
router.post("/edit/futbolistas", editPlayersMiddlewares, editController.edit)
router.post("/edit/equipos", editTeamsMiddlewares, editController.edit)
router.post("/edit/copas", editTrophiesMiddlewares, editController.edit)
router.post("/view", verificarToken, viewController.view)
router.get("/last", verificarToken, lastController.last)
router.get("/moreViews", verificarToken, moreViewController.moreViews)
router.get("/news", verificarToken, newController.news)
router.get("/more/:category/views", verificarToken, viewCategory.viewsCategory)

module.exports = router