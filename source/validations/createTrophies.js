const { body } = require("express-validator");

const createTrophies = [
    body("title").notEmpty().withMessage("El nombre no puede quedar vacío").bail().isLength({ min: 2 }).withMessage("El titulo debe contener un minímo de dos caracters").bail().isLength({ max: 100 }).withMessage("El título no debe contener más de cien caracteres").bail(),
    body("campus").notEmpty().withMessage("La sede no debe quedar vacia").bail()
]

module.exports = createTrophies;