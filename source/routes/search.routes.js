const { Router } = require('express');
const router = Router();
const searchControllers = require("../controllers/search.controllers")

router.get("/results", searchControllers.results);
router.post("/article", searchControllers.searchArticle)

module.exports = router