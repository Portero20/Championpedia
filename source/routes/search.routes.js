const { Router } = require('express');
const router = Router();
const searchControllers = require("../controllers/search.controllers")

router.get("/results", searchControllers.results);

module.exports = router