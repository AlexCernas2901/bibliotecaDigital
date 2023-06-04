const fs = require("fs");
const { matchedData } = require("express-validator");
const { filesModel } = require("../models");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

// opciones para paginar
// const options = { 
//   page: 1,
//   limit: 35
// }

const getFiles = async (req, res) => { // declarando controlador para obtener archivos
  try {
    const user = req.session.data.user;
    const filesData = await filesModel.find({});
    console.log(user, filesData);
    res.render("files", { filesData, user, main: true });
  } catch (e) {
    req.session.alert = "Error al intentar obtener archivos";
    return res.redirect("/admin/files");
  }
};

const getFileByName = async (req, res) => { // declarando controlador para obtener archivo por filename
  try {
    const { tittle } = req.body;
    const user = req.session.data.user;
    const filesData = await filesModel.find({ tittle });
    console.log(user, filesData);
    res.render("files", { filesData, user, main: false });
  } catch (e) {
    req.session.alert = "Error al intentar buscar el archivo";
    return res.redirect("/admin/files");
  }
};

const getFile = async (req, res) => { // declarando controlador para obtener archivo por ID
  try {
    const { id } = matchedData(req)
    const data = await filesModel.findById(id);
    console.log(data);
    res.send({ data });
  } catch (e) {
    req.session.alert = "Error al intentar obtener archivo";
    return res.redirect("/admin/files");
  }
};

const deleteFile = async (req, res) => { // declarando controlador para eliminar un archivo
  try {
    const { id } = matchedData(req);
    const data = await filesModel.findById(id);
    await filesModel.deleteOne({ _id: id });
    const { filename } = data;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al eliminar el archivo físico");
      }
      res.redirect("/admin/files");
    });
  } catch (e) {
    req.session.alert = "Error al intentar eliminar el archivo";
    return res.redirect("/admin/files");
  }
};

const createFile = async (req, res) => { // declarando controlador para crear un archivo
  try {
    const { body, file } = req;
    console.log(file);
    const { tittle } = matchedData(req);
    const ext = file.originalname.split(".").pop();
    console.log(file);
    const fileData = {
      tittle,
      filename: `${file.filename}`,
      url: `${PUBLIC_URL}/${file.filename}`
    }    
    const data = await filesModel.create(fileData);
    res.redirect("/admin/files");
  } catch (e) {
    req.session.alert = "Error al intentar crear el archivo";
    return res.redirect("/admin/files");
  }
};

module.exports = {
  getFile,
  getFiles,
  deleteFile,
  createFile,
  getFileByName
};
