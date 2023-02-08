const { body } = require("express-validator");

const createTeams = [
    body("title").notEmpty().withMessage("El nombre no puede quedar vacío").bail().isLength({ min: 2 }).withMessage("El titulo debe contener un minímo de dos caracters").bail().isLength({ max: 100 }).withMessage("El título no debe contener más de cien caracteres").bail(),
    body("foundation").notEmpty().withMessage("La fecha de fundacion no debe quedar vacia").bail()
]

module.exports = createTeams;