const fs = require("fs");
const { matchedData } = require("express-validator");
const { filesModel } = require("../models");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getFiles = async (req, res) => {// declarando controlador para obtener los archivos
  try {
    const user = req.session.data.user;
    const filesData = await filesModel.find({});
    console.log(user, filesData);
    const alerts = req.session.alerts || [];
    delete req.session.alerts;
    res.render("files", { alerts, filesData, user, main: true });
  } catch (e) {
    req.session.alerts = ["Error al intentar obtener archivos"];
    return res.redirect("/files");
  }
};

const getFileByName = async (req, res) => { // declarando controlador para seleccionar un archivo por su titulo
  try {
    const { tittle } = req.body;
    const user = req.session.data.user;
    const filesData = await filesModel.find({ tittle });
    const alerts = req.session.alerts || [];
    delete req.session.alerts;
    res.render("files", { alerts, filesData, user, main: false });
  } catch (e) {
    req.session.alerts = ["Error al intentar buscar el archivo"];
    return res.redirect("/files");
  }
};

const getFile = async (req, res) => {// declarando controlador para seleccionar archivo por id
  try {
    const { id } = matchedData(req);
    const data = await filesModel.findById(id);
    console.log(data);
    res.send({ data });
  } catch (e) {
    req.session.alerts = ["Error al intentar obtener archivo"];
    return res.redirect("/admin/files");
  }
};

const deleteFile = async (req, res) => {// declarando controlador para eliminar un archivo
  try {
    const { id } = matchedData(req);
    const data = await filesModel.findById(id);
    await filesModel.deleteOne({ _id: id });
    const { filename } = data;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        req.session.alerts = ["Error al eliminar el archivo físico"];
        return res.redirect("/admin/files");
      }
      req.session.alerts = []; // Limpiar los mensajes de alerta antes de enviar la respuesta
      res.redirect("/admin/files");
    });
  } catch (e) {
    req.session.alerts = ["Error al intentar eliminar el archivo"];
    return res.redirect("/admin/files");
  }
};

const createFile = async (req, res) => { // declarando controlador para crear un nuevo archivo
  try {
    const { file } = req;
    const { tittle } = matchedData(req);
    const fileData = {
      tittle,
      filename: `${file.filename}`,
      url: `${PUBLIC_URL}/${file.filename}`
    }
    const data = await filesModel.create(fileData);
    req.session.alerts = []; // Limpiar los mensajes de alerta antes de enviar la respuesta
    res.redirect("/admin/files");
  } catch (e) {
    req.session.alerts = ["Error al intentar crear el archivo"]; // Establecer un nuevo array de alertas con el mensaje de error
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