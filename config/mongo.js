const mongoose = require("mongoose");

const dbConnect = () => {// conexion a la base de datos
    const DB_URI = process.env.DB_URI // pidiendo la URI de la base de datos
    mongoose.connect(
        DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
        console.log("CONNECTION SUCCESSFULLY");
    });
};

module.exports = dbConnect; //exportando el modulo para usarlo en otros archivos
