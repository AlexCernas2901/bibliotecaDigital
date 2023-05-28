const { check } = require("express-validator");
const { validateResults } = require("../utils/handdleValidator");

// validando titulo del archivo
const createFileValidator = [
    check("titulo")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// validando id del archivo
const getFileWithIdValidator = [
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// validando id del archivo
const filenameValidator = [
    check("filename")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// validando para busqueda
const getFileValidator = [
    check("q")
    .exists()
    .notEmpty()
    .withMessage('El parámetro de búsqueda no puede estar vacío'),
];

module.exports = { createFileValidator, getFileValidator, getFileWithIdValidator, filenameValidator };