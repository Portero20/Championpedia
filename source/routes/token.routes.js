const { Router } = require('express');
const router = Router();

const tokenControllers = require("../controllers/token.controllers")
const { protegerRutaToken } = require("../middlewares/protectPathToken.middleware")

// router.get("/", protegerRutaToken(), tokenControllers.token);
router.get("/", tokenControllers.token);


module.exports = router