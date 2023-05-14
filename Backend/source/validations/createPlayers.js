const { body } = require("express-validator");
const { extname } = require("path")

const createPlayers = [
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
    body("nickName").optional({ checkFalsy: true }).isLength({ min: 2 }).withMessage("Apodo mínimo: 2 caracteres").bail().isLength({ max: 100 }).withMessage("El o los apodos no deben superar los cien caracteres").bail().custom(value => {
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
    body("born").notEmpty().withMessage("La fecha de nacimiento no puede quedar vacía").bail().isISO8601()
        .withMessage('Fecha debe tener un formato válido ISO 8601. (Año-mes-dia)').bail(),
    body("height").notEmpty().withMessage("La altura no debe quedar vacía").bail().isNumeric().withMessage("La altura debe ser un número").bail().custom(value => {
        if (value <= 1.50) {
            throw new Error("La altura debe ser mayor a 1.50")
        }

        if (value >= 2.40) {
            throw new Error("La altura debe ser menor a 2.40")
        }

        return true
    }),
    body("weight").notEmpty().withMessage("El peso no debe quedar vacío").bail().isNumeric().withMessage("El peso debe ser un número").bail().custom(value => {
        if (value <= 50) {
            throw new Error("El peso debe ser mayor a 50Kg")
        }

        if (value >= 150) {
            throw new Error("El peso debe ser menor a 150Kg")
        }

        return true
    }),
    body("nationality").notEmpty().withMessage("La nacionalidad no debe quedar vacía").bail().isLength({ min: 2 }).withMessage("La nacionalidad debe contener un mínimo de dos caracteres").bail().isLength({ max: 50 }).withMessage("La nacionalidad no debe superar los cincuenta caracteres").bail().custom(value => {
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
    body("position").notEmpty().withMessage("La posicion no puede quedar vacia").bail().isLength({ min: 2 }).withMessage("La posición debe contener un mínimo de dos caracteres").bail().custom(value => {
        positions = value.split(",").map(p => {
            return p
        })

        if (positions.length > 3) {
            throw new Error("Puedes agregar un máximo de 3 posiciones")
        }

        positions.forEach(positions => {
            if (positions.length > 30) {
                throw new Error("La posición supera los treinta caracteres")
            }
        })

        positions.forEach(p => {
            for (let index = 0; index < p.length; index++) {
                if (p[index].indexOf('"') !== -1) {
                    throw new Error("No se permiten comillas")
                }
            }
        })

        return true
    }),
    body("team").notEmpty().withMessage("El equipo no debe quedar vacío").bail().isLength({ min: 2 }).withMessage("El equipo debe contener un mínimo de dos caracteres").bail().isLength({ max: 100 }).withMessage("El equipo no debe suérar los cien caracteres").bail().custom(value => {
        for (let index = 0; index < value.length; index++) {
            if (value[index].indexOf('"') !== -1) {
                throw new Error("No se permiten comillas")
            }
        }

        return true
    }),
    body("numbers").notEmpty().withMessage("El número no debe quedar vacío").bail().custom(value => {
        numbers = value.split(",").map(n => {
            return n
        })

        if (numbers.length > 10) {
            throw new Error("Puedes agregar un máximo de diez números")
        }

        numbers.forEach(numbers => {
            if (numbers.length > 3) {
                throw new Error("El número supera los tres dígitos caracteres")
            }
        })

        return true
    }),
    body("goals").notEmpty().withMessage("Los goles no pueden quedar vacíos").bail().custom(value => {
        if (value < 0) {
            throw new Error("La cantidad mínima de goles es de 0")
        }

        if (value > 1400) {
            throw new Error("La cantidad máxima de goles es de 1400")
        }

        return true
    }),
    body("debut").notEmpty().withMessage("La fecha de debut no puede quedar vacía").isISO8601()
        .withMessage('Fecha debe tener un formato válido ISO 8601. (Año-mes-dia)').bail(),
    body("image").custom((value, { req }) => {
        let imagen = req.files

        if (!imagen || imagen.length == 0) {
            throw new Error("La imagen no puede quedar vacía")
        }

        let extensiones = [".svg", ".jpg", ".png", ".jpeg"]
        let extension = extname(imagen[0].originalname)
        if (!extensiones.includes(extension)) {
            throw new Error("La extension debería ser '.svg', '.jpg', '.png', '.jpeg'")
        }

        if (imagen[0].size > 2097152) {
            throw new Error("La imagen supera el peso de 2MB");
        }

        if (req.files && req.files.length > 1) {
            throw new Error("Solo puedes subir una imagen");
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
    })
]

module.exports = createPlayers;