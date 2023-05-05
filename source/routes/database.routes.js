const { Router } = require('express');
const router = Router();
const dbControllers = require("../controllers/database.controllers")

router.get("/create", dbControllers.create);

module.exports = router