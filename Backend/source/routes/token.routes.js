const { Router } = require('express');
const router = Router();

const tokenControllers = require("../controllers/token.controllers")
const { verificarApiKey } = require("../middlewares/protectPathToken.middleware")

router.get("/", verificarApiKey, tokenControllers.token);

module.exports = router