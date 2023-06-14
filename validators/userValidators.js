const { check,validationResult } = require("express-validator");
// const { validateResults } = require("../utils/handleValidator");

const getUserWithIdValidator = [
  // validando id del usuario
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/admin/users");
    }
    next();
  },
];

const getBodyUserValidator = [
  // validando datos del Body
  check("name").exists().notEmpty(),
  check("matricula").exists().isNumeric().notEmpty(),
  check("role").exists().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/admin/users");
    }
    next();
  },
];

const getUserPasswordValidator = [
  // validando para busqueda (en desarrollo)
  check("password").exists().notEmpty().isLength({ min: 10, max: 18 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/admin/users");
    }
    next();
  },
];

const matriculaValidator = [
  check("matricula").exists().notEmpty().isLength({ min: 8, max: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/admin/users");
    }
    next();
  },
]

module.exports = {
  getUserWithIdValidator,
  getBodyUserValidator,
  getUserPasswordValidator,
  matriculaValidator
};
