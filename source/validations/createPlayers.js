const { body } = require("express-validator");

const createPlayers = [
    // Titulo no vacio, mas de 2 y menos de 100
    body("title").notEmpty().withMessage("El título no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El título debe contener un mínimo de dos caracteres").bail().isLength({ max: 100 }).withMessage("El título debe contener un máximo de cien caracteres").bail(),
    // Text no vacio, mas de 100 y menos de 16700000
    body("text").notEmpty().withMessage("Debes completar este campo").bail().isLength({ min: 100 }).withMessage("El texto ingresado es demasiado corto").bail().isLength({ max: 16700000 }).withMessage("El texto es demasiado largo").bail(),
    // Author no vacio, mas de 2 y menos de 50, no numeros, falta corregir -----------------------------------------------
    body("author").notEmpty().withMessage("Debes completar tu nombre").bail().isLength({ min: 2 }).withMessage("El nombre es demasiado corto").bail().isLength({ max: 50 }).withMessage("El nombre es demasiado largo").bail().isString().withMessage("No se permiten numeros en el nombre").bail(),
    // fullName no vacio, mas de 2 y minimo de 100, no numeros, falta corregir ---------------------------------------------
    body("fullName").notEmpty().withMessage("El nombre no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El nombre debe tener como mínimo dos caracteres").bail().isLength({ max: 100}).withMessage("El nombre debe tener un máximo de cien caracteres").bail(),
    // nickName puede quedar vacio, mas de 2 y minimo de 255, hacer custom falta corregir --------------------------------------
    body("nickName").isLength({ min: 2 }).withMessage("El apodo debe tener como mínimo dos caracteres").bail().isLength({ max: 100}).withMessage("El apodo debe tener un máximo de cien caracteres").bail(),
    // born no vacio
    body("born").notEmpty().withMessage("La fecha de nacimiento no puede quedar vacía").bail(),
    // height no vacio, numero, no mas de 9,99 ni 0 o menos

    // weight no vacio, numero, no mas de 999,9 ni 0 o menos

    // nationality no vacio, no numero, mas de 2 y menos de 50

    // position no vacia, no numero, mas de 2 y menos de 100
    body("position").notEmpty().withMessage("La posicion no puede quedar vacia").bail()

    // team no vacio, mas de 2 y menos de 100

    // numbers no vacio, mas de 2 y menos de 100

    // goals no vacio, mas de 0 y menos de 5000

    // debut no vacio

]

module.exports = createPlayers;