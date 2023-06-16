const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator")

const registerValidator = [
  // validando datos para registrar un nuevo usuario
  check("name").exists().notEmpty().isLength({ min: 3, max: 100 }),
  check("password").exists().notEmpty().isLength({ min: 10, max: 18 }),
  check("matricula").exists().notEmpty().isNumeric({ min: 8, max: 8 }),
  (req, res, next) => {
    return validateResults(req, res, next);
}
];

const loginValidator = [
  // validando datos para inicio de session
  check("matricula").exists().notEmpty().isNumeric({ min: 8, max: 8 }),
  check("password").exists().notEmpty().isLength({ min: 10, max: 18 }),
  (req, res, next) => {
    return validateResults(req, res, next);
}
];

module.exports = { registerValidator, loginValidator };
