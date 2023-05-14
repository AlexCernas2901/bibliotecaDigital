const mongoose = require("mongoose");
// modelo de archivos
const fileSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("files", fileSchema)
