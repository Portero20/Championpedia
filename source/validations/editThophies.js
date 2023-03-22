const { body } = require("express-validator");
const { extname } = require("path")

const editTrophies = [
    body("title").notEmpty().withMessage("El título no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El título debe contener un mínimo de dos caracteres").bail().isLength({ max: 100 }).withMessage("El título no debe superar los cien caracteres").bail(),
    body("text").notEmpty().withMessage("Debes completar este campo").bail().isLength({ min: 200 }).withMessage("El texto ingresado es demasiado corto").bail().isLength({ max: 16700000 }).withMessage("El texto es demasiado largo").bail(),
    body("fullName").notEmpty().withMessage("El nombre no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El nombre debe tener como mínimo dos caracteres").bail().isLength({ max: 100 }).withMessage("El nombre no debe superar los cien caracteres").bail().custom(value => {
        let valor = value;
        let num = /\d/.test(valor);

        if (num) {
            throw new Error("No se permiten números")
        }

        return true
    }),
    body("foundation").notEmpty().withMessage("La fecha de fundación no debe quedar vacía").bail().isISO8601()
        .withMessage('Fecha debe tener un formato válido ISO 8601. (Año-mes-dia)').bail(),
    body("campus").notEmpty().withMessage("La sede no deber quedar vacía").bail().isLength({ min: 2 }).withMessage("La sede debe tener como mínimo dos caracteres").bail().isLength({ max: 100 }).withMessage("La sede no debe superar los cien caracteres").bail().custom(value => {
        for (let index = 0; index < value.length; index++) {
            if (value[index].indexOf('"') !== -1) {
                throw new Error("No se permiten comillas")
            }
        }

        return true
    }),
    body("organizer").notEmpty().withMessage("El organizador no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El organizador debe tener como mínimo dos caracteres").bail().isLength({ max: 100 }).withMessage("El organizador no debe superar los cien caracteres").bail().custom(value => {
        for (let index = 0; index < value.length; index++) {
            if (value[index].indexOf('"') !== -1) {
                throw new Error("No se permiten comillas")
            }
        }

        return true
    }),
    body("champion").notEmpty().withMessage("El campeón no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El campeón debe tener como mínimo dos caracteres").bail().isLength({ max: 100 }).withMessage("El campeón no debe superar los cien caracteres").bail().custom(value => {
        for (let index = 0; index < value.length; index++) {
            if (value[index].indexOf('"') !== -1) {
                throw new Error("No se permiten comillas")
            }
        }

        return true
    }),
    body("subchampion").notEmpty().withMessage("El subcampeón no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El subcampeón debe tener como mínimo dos caracteres").bail().isLength({ max: 100 }).withMessage("El subcampeón no debe superar los cien caracteres").bail().custom(value => {
        for (let index = 0; index < value.length; index++) {
            if (value[index].indexOf('"') !== -1) {
                throw new Error("No se permiten comillas")
            }
        }

        return true
    }),
    body("tags").notEmpty().withMessage("Los tags no deben quedar vacíos").bail().custom(value => {
        tags = value.split(",").map(tag => {
            return tag
        })

        if (tags.length > 10) {
            throw new Error("Puedes agregar un máximo de diez tags")
        }

        tags.forEach(tags => {
            if (tags.length > 30) {
                throw new Error("El tag supera los treinta caracteres")
            }
        })

        return true
    }),
    body("image").custom((value, { req }) => {
        let imagen = req.file

        if (!imagen || imagen.length == 0) {
            return true
        }

        let extensiones = [".svg", ".jpg", ".png", ".jpeg"]
        let extension = extname(imagen.originalname)
        if (!extensiones.includes(extension)) {
            throw new Error("La extension debería ser '.svg', '.jpg', '.png', '.jpeg'")
        }

        if (imagen.size > 2097152) {
            throw new Error("La imagen supera el peso de 2MB");
        }

        return true
    })
]

module.exports = editTrophies;