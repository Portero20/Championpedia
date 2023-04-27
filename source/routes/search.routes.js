const { Router } = require('express');
const router = Router();
const searchControllers = require("../controllers/search.controllers")

// Middleware autenticar Token
const { verificarToken } = require("../middlewares/verifyToken.middleware")

router.get("/results", verificarToken, searchControllers.results);
router.post("/article", verificarToken, searchControllers.searchArticle)

module.exports = router