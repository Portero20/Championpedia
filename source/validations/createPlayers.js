const { body } = require("express-validator");

const createPlayers = [
    // Titulo no vacio, mas de 2 y menos de 100
    body("title").notEmpty().withMessage("El título no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El título debe contener un minímo de dos caracteres").bail().isLength({ max: 100 }).withMessage("El título no debe contener más de cien caracteres").bail(),
    // Text no vacio, mas de 100 y menos de 16700000
    body("text").notEmpty().withMessage("Debes completar este campo").bail().isLength({ min: 100 }).withMessage("El texto ingresado es demansiado corto").bail().isLength({ max: 16700000 }).withMessage("El texto es demasiado largo").bail(),
    // Author no vacio, mas de 2 y menos de 50, no numeros
    body("author").notEmpty().withMessage("Debes completar tu nombre").bail().isLength({ min: 2 }).withMessage("El nombre es demasiado corto").bail().isLength({ max: 50 }).withMessage("El nombre es demasiado largo").bail().isString().withMessage("No se permiten numeros en el nombre").bail(),
    // fullName no vacio, mas de 2 y minimo de 100
    body("fullName").notEmpty().withMessage("El nombre completo no debe quedar vacío").bail(),



    body("position").notEmpty().withMessage("La posicion no puede quedar vacia").bail()
]

module.exports = createPlayers;