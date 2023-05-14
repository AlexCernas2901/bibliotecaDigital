const fs = require("fs");
const { matchedData } = require("express-validator");
const { filesModel } = require("../models");
const { handdleHttpError } = require("../utils/handdleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

// declarando controlador para obtener archivos
const getFiles = async (req, res) => {
  try {
    const user = req.user;
    const data = await filesModel.find({});
    console.log(data);
    res.send({ data, user });
  } catch (e) {
    handdleHttpError(res, "ERROR GETTING FILES");
  }
};

// declarando controlador para editar archivo
// const editFile = async (req, res) => {
//   try {
//     req = matchedData(req);
//     const { id } = req;
//     const data = await filesModel.findById({ _id: id });
//     console.log(data);
//     res.send({ data });
//   } catch (e) {
//     handdleHttpError(res, "ERROR EDITING FILE");
//   }
// };

// declarando controlador para obtener archivo por ID
const getFile = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await filesModel.findById( id );
    console.log(data);
    res.send({ data });
  } catch (e) {
    handdleHttpError(res, "ERROR GETTING FILES");
  }
};

// declarando controlador para eliminar un archivo por ID
const deleteFile = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await filesModel.findById(id);
    await filesModel.deleteOne({ _id: id })
    const { filename } = data;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlinkSync(filePath);
    const deletedFile = {
      filePath,
      deleted: "SUCCESSFULLY DELETED"
    }
    res.send({ deletedFile });
  } catch (e) {
    handdleHttpError(res, "ERROR DELETING FILES");
  }
};

// declarando controlador para actualizar un archivo
// const updateFile = async (req, res) => {
//   try {
//     // obteniendo 2 objetos a travez de uno
//     const { id, ...body } = matchedData(req);
//     const data = await filesModel.findOneAndUpdate(id, body);
//     console.log(data);
//     res.send({ data });
//   } catch (e) {
//     handdleHttpError(res, "ERROR UPDATING FILE");
//   }
// };

// declarando controlador para crear archivo
const createFile = async (req, res) => {
    const { body, file } = req;
    console.log(file);
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await filesModel.create(fileData);
    res.send({ data });
};

module.exports = {
  getFile,
  getFiles,
  deleteFile,
  createFile,
  // updateFile,
  // editFile,
};
