const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")
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

fileSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("files", fileSchema)
