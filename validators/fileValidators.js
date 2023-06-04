const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator");

const createFileValidator = [ // validando titulo del archivo
    check("titulo")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const getFileWithIdValidator = [ // validando id del archivo
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const filenameValidator = [ // validando id del archivo
    check("filename")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const getFileValidator = [ // validando para busqueda
    check("q")
    .exists()
    .notEmpty()
    .withMessage('El parámetro de búsqueda no puede estar vacío'),
];

module.exports = { createFileValidator, getFileValidator, getFileWithIdValidator, filenameValidator };