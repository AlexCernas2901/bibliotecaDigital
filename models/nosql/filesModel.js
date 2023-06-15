const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const fileSchema = new mongoose.Schema( // modelo de archivos
    {
      tittle: {
        type: String,
      },
      filename: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

fileSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("files", fileSchema)
