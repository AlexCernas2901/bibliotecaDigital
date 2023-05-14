const { usersModel } = require("../models");
const { handdleHttpError } = require("../utils/handdleError");
const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/handdlePassword");
const { signToken } = require("../utils/handdleJWT");

// Declarando controlador para obtener usuarios
const getUsers = async (req, res) => {
  try {
    const user = req.user;
    const data = await usersModel.find({});
    console.log(data);
    res.send({ data, user });
  } catch (e) {
    handdleHttpError(res, "ERROR GETTING USERS");
  }
};

// Declarando controlador para editar usuario
const editUser = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await usersModel.findById({ _id: id });
    console.log(data);
    res.send({ data });
  } catch (e) {
    handdleHttpError(res, "ERROR EDITING USERS");
  }
};

// Declarando controlador para obtener usuario por ID
const getUser = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await usersModel.findById(id);
    console.log(data);
    res.send({ data });
  } catch (e) {
    handdleHttpError(res, "ERROR GETTING USERS");
  }
};

// Declarando controlador para eliminar un usuario por ID
const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req);
    await usersModel.deleteOne({ _id: id });
    const deletedUser = {
      deleted: "SUCCESSFULLY DELETED"
    };
    res.send({ deletedUser });
  } catch (e) {
    handdleHttpError(res, "ERROR DELETING USERS");
  }
};

// Declarando controlador para actualizar un usuario
const updateUser = async (req, res) => {
    try {
      const { id, ...body } = matchedData(req);
      if (body.password) {
        body.password = await encrypt(body.password);
      }
      const data = await usersModel.findOneAndUpdate(id, body);
      console.log(data);
    const updatedUser = await usersModel.findById(data._id).select("name matricula password role");
      updatedUser.set("password", undefined, { strict:false });
      
      const updatedData = {
        token: await signToken(updatedUser),
        user: updatedUser
      };
      
      res.send({ data: updatedData });
    } catch (e) {
      handdleHttpError(res, "ERROR UPDATING USERS");
    }
  };

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  editUser
};