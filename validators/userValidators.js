const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator");

const getUserWithIdValidator = [
  // validando id del usuario
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const getBodyUserValidator = [
  // validando datos del Body
  check("name").exists().notEmpty(),
  check("matricula").exists().isNumeric().notEmpty(),
  check("role").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const getUserPasswordValidator = [
  // validando para busqueda (en desarrollo)
  check("password").exists().notEmpty().isLength({ min: 10, max: 18 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const verifyPassData = [
  // validando para busqueda
  check("currentPass").exists().notEmpty().isLength({ min: 10, max: 18 }),
  check("newPass").exists().notEmpty().isLength({ min: 10, max: 18 }),
  check("confirmPass").exists().notEmpty().isLength({ min: 10, max: 18 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const matriculaValidator = [
  // validando el campo matricula
  check("matricula").exists().notEmpty().isLength({ min: 8, max: 8 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

module.exports = {
  getUserWithIdValidator,
  getBodyUserValidator,
  getUserPasswordValidator,
  matriculaValidator,
  verifyPassData
};
