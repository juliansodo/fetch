const os = require("os");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("cookie-session");
const uploadfiles = require("express-fileupload");
const busboy = require("connect-busboy");
//Declaraciones
app.set("puerto", process.env.PORT || 3000);


//Variables Globales


//MIDDLEWARES - Funciones que deben ejecutarse antes de cargarse las rutas.
app.set('views', path.join(__dirname, '/vistas'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(busboy());
app.use(uploadfiles());
app.use(session({
    name: "sesion",
    keys: ['clave1', 'clave2']
}));
//rutas

app.use("/", require("./rutas/index"));

//Configuraciones
app.listen(app.get("puerto"), ()=>
{
    console.log("Servidor corriendo en el puerto " + app.get("puerto"));
})
