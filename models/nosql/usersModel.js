const mongoose = require("mongoose");
// modelo de usuarios
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        password: {
            type: String,
            select:false
        },
        matricula: {
            type: Number
        },
        role: {
            type: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("users", userSchema)
