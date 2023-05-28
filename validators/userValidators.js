const { check } = require("express-validator");
const { validateResults } = require("../utils/handdleValidator");

// validando id del usuario
const getUserWithIdValidator = [
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// validando para busqueda
const getUserValidator = [
    check("q")
    .exists()
    .notEmpty()
    .withMessage('El parámetro de búsqueda no puede estar vacío'),
];

module.exports = { getUserValidator, getUserWithIdValidator };