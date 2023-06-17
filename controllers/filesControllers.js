const fs = require("fs");
const { matchedData } = require("express-validator");
const { filesModel } = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
const { handleHttpError } = require("../utils/handleError");

// Controlador para obtener archivos
const getFiles = async (req, res) => {
  try {
    const user = req.session.data.user;
    const filesData = await filesModel.find({});
    console.log(user, filesData);
    res.json({ filesData, user, main: true });
  } catch (error) {
    handleHttpError(res, "Error al obtener archivos", 500);
  }
};

// Controlador para obtener un archivo por nombre
const getFileByName = async (req, res) => {
  try {
    const { tittle } = req.body;
    const user = req.session.data.user;
    const filesData = await filesModel.find({ tittle });
    res.json({ filesData, user, main: false });
  } catch (error) {
    handleHttpError(res, "Error archivo no encontrado", 404);
  }
};

// Controlador para obtener un archivo por ID
const getFile = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await filesModel.findById(id);
    console.log(data);
    res.json({ data });
  } catch (error) {
    handleHttpError(res, "Error archivo no encontrado", 404);
  }
};

// Controlador para eliminar un archivo
const deleteFile = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await filesModel.findById(id);
    await filesModel.deleteOne({ _id: id });
    const { filename } = data;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        handleHttpError(res, "Error eliminar archivo", 500);
      }
      res.redirect("/admin/files");
    });
  } catch (error) {
    handleHttpError(res, "Error eliminar archivo", 500);
  }
};

// Controlador para crear un archivo
const createFile = async (req, res) => {
  try {
    const { file } = req;
    const { tittle } = matchedData(req);
    const fileData = {
      tittle,
      filename: `${file.filename}`,
      url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await filesModel.create(fileData);
    res.json({ data });
  } catch (error) {
    handleHttpError(res, "Error al crear archivo", 500);
  }
};

module.exports = {
  getFile,
  getFiles,
  deleteFile,
  createFile,
  getFileByName
};
