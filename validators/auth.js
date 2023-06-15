const { check, validationResult } = require("express-validator");

const registerValidator = [
  // validando datos para registrar un nuevo usuario
  check("name").exists().notEmpty().isLength({ min: 3, max: 100 }),
  check("password").exists().notEmpty().isLength({ min: 10, max: 18 }),
  check("matricula").exists().notEmpty().isNumeric({ min: 8, max: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/files");
    }
    next();
  },
];

const loginValidator = [
  // validando datos para inicio de session
  check("matricula").exists().notEmpty().isNumeric({ min: 8, max: 8 }),
  check("password").exists().notEmpty().isLength({ min: 10, max: 18 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/login");
    }
    next();
  },
];

module.exports = { registerValidator, loginValidator };
