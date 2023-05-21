const fs = require("fs");
const { matchedData } = require("express-validator");
const { filesModel } = require("../models");
const { handdleHttpError } = require("../utils/handdleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

// opciones para paginar
const options = {
  page: 1,
  limit: 35
}
// declarando controlador para obtener archivos
const getFiles = async (req, res) => {
  try {
    const user = req.session.data.user;
    const filesData = await filesModel.find({});
    console.log(user, filesData);
    res.render("files", { filesData, user, main:true });
  } catch (e) {
    handdleHttpError(res, "ERROR GETTING FILES");
  }
};

// declarando controlador para obtener archivo por filename
const getFileByName = async (req, res) => {
  try {
    const { filename } = req.body;
    const user = req.session.data.user;
    const filesData = await filesModel.find({ filename });
    console.log(user, filesData);
    res.render("files", { filesData, user, main:false });
  } catch (e) {
    handdleHttpError(res, "ERROR GETTING SEARCHED FILES");
  }
};

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

// declarando controlador para crear archivo
const createFile = async (req, res) => {
    const { body, file } = req;
    console.log(file);
    const fileData = {
      filename: `${file.filename}`,
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
  getFileByName 
};
