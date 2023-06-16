const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator");

const createFileValidator = [
  // validando titulo del archivo
  check("tittle").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const getFileWithIdValidator = [
  // validando id del archivo
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

const bodyFileValidator = [
  check("filename").custom((value, { req }) => {
    if (!value.endsWith(".pdf")) {
      throw new Error("El archivo debe ser de tipo PDF");
    }
    return true;
  }),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
];

module.exports = {
  bodyFileValidator,
  createFileValidator,
  getFileWithIdValidator,
};
