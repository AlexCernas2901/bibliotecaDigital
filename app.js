const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/mongo");
const userSession = require("./config/session");

const app = express();
const PORT = process.env.PORT; // variable de entorno para el puerto
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(userSession); // session del usuario

app.use(express.static("storage")); // uso de archivos estaticos
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes")); // haciendo uso de las rutas
 
app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));

dbConnect(); // declarando conexion con la base de datos

