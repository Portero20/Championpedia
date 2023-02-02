const { Router } = require('express');
const router = Router();
const articlesControllers = require("../controllers/articles.controllers")

router.post("/create", articlesControllers.create)

module.exports = router