const { check, validationResult } = require("express-validator");

const createFileValidator = [
  // validando titulo del archivo
  check("tittle").exists().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/admin/files");
    }
    next();
  },
];

const getFileWithIdValidator = [
  // validando id del archivo
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/admin/files");
    }
    next();
  },
];

const bodyFileValidator = [
  check("filename").custom((value, { req }) => {
    if (!value.endsWith(".pdf")) {
      throw new Error("El archivo debe ser de tipo PDF");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.redirect("/admin/files");
    }
    next();
  },
];

module.exports = {
  bodyFileValidator,
  createFileValidator,
  getFileWithIdValidator,
};
