const { filesModel } = require("../models");

const editUsers = (req, res) => {
    const user = req.session.data.user;
    res.render("admin-users", { user, main: false });
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

module.exports = { editFiles, editUsers,  addFile };

