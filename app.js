const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
const dbConnect = require("./config/mongo")
const port = process.env.PORT; // variable de entorno para el puerto
const userSession = require("./config/session");

app.use(userSession); // session del usuario

app.use(express.static("storage")); // uso de archivos estaticos
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes")); // haciendo uso de las rutas
 
app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));

dbConnect(); // declarando conexion con la base de datos

