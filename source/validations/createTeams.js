const { body } = require("express-validator");
const { extname } = require("path")

const createTeams = [
    body("title").notEmpty().withMessage("El título no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El título debe contener un mínimo de dos caracteres").bail().isLength({ max: 100 }).withMessage("El título no debe superar los cien caracteres").bail(),
    body("text").notEmpty().withMessage("Debes completar este campo").bail().isLength({ min: 200 }).withMessage("El texto ingresado es demasiado corto").bail().isLength({ max: 16700000 }).withMessage("El texto es demasiado largo").bail(),
    body("author").notEmpty().withMessage("Tu nombre no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El nombre es demasiado corto").bail().isLength({ max: 100 }).withMessage("El nombre es demasiado largo").bail().custom(value => {
        let valor = value;
        let num = /\d/.test(valor);

        if (num) {
            throw new Error("No se permiten números")
        }

        return true
    }),
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
    body("president").notEmpty().withMessage("El nombre del presidente no puede quedar vacío").bail().isLength({ min: 2 }).withMessage("El nombre debe tener como mínimo dos caracteres").bail().isLength({ max: 100 }).withMessage("El nombre no debe superar los cien caracteres").bail().custom(value => {
        let valor = value;
        let num = /\d/.test(valor);

        if (num) {
            throw new Error("No se permiten números")
        }

        for (let index = 0; index < valor.length; index++) {
            if (valor[index].indexOf('"') !== -1) {
                throw new Error("No se permiten comillas")
            }
        }

        return true
    }),
    body("stadium").notEmpty().withMessage("El nombre del estadio no puede quedar vacío").bail().isLength({ min: 2 }).withMessage("El nombre debe tener como mínimo dos caracteres").bail().isLength({ max: 100 }).withMessage("El nombre no debe superar los cien caracteres").bail().custom(value => {
        for (let index = 0; index < value.length; index++) {
            if (value[index].indexOf('"') !== -1) {
                throw new Error("No se permiten comillas")
            }
        }

        return true
    }),
    body("coach").notEmpty().withMessage("El nombre no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El nombre debe tener como mínimo dos caracteres").bail().isLength({ max: 100 }).withMessage("El nombre no debe superar los cien caracteres").bail().custom(value => {
        let valor = value;
        let num = /\d/.test(valor);

        if (num) {
            throw new Error("No se permiten números")
        }

        for (let index = 0; index < valor.length; index++) {
            if (valor[index].indexOf('"') !== -1) {
                throw new Error("No se permiten comillas")
            }
        }

        return true
    }),
    body("nickName").optional({ checkFalsy: true }).isLength({ min: 2 }).withMessage("El apodo debe tener como mínimo dos caracteres").bail().isLength({ max: 100 }).withMessage("El o los apodos no deben superar los cien caracteres").bail().custom(value => {
        apodos = value.split(",").map(a => {
            return a
        })

        if (apodos.length > 5) {
            throw new Error("Puedes agregar un máximo de cinco apodos")
        }

        apodos.forEach(apodos => {
            if (apodos.length > 30) {
                throw new Error("El apodo supera los treinta caracteres")
            }
        })

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
            throw new Error("La imagen no puede quedar vacía")
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

module.exports = createTeams;