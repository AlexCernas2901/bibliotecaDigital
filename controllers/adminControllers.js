const { filesModel } = require("../models");
const { usersModel } = require("../models");
const { matchedData } = require("express-validator");

const editUsers = async (req, res) => {
  const user = req.session.data.user;
  const usersData = await usersModel.find({});
  res.render("admin-users", { usersData, user, main: false });
};

const addFile = async (req, res) => {
  user = req.session.data.user;
  res.render("add-file", { user, main: false });
};

const editFiles = async(req, res) => {
  const user = req.session.data.user;
  const filesData = await filesModel.find({});
  res.render("admin-files", { filesData, user, main: false });
};


const addUser = async (req, res) => {
  user = req.session.data.user;
  res.render("add-user", { user, main: false });
};

const editUser = async (req, res) => {
  const { id } = matchedData(req);
  const userData = await usersModel.findById(id);
  const alert = req.session.alert;
  console.log(userData);
  res.render("edit-user", { alert, userData });
};

module.exports = { 
  editFiles,
  editUsers,  
  addFile, 
  addUser, 
  editUser 
};

