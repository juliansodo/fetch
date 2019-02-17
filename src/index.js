const os = require("os");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("cookie-session");
const uploadfiles = require("express-fileupload");
const busboy = require("connect-busboy");
const timeago = require("timeago.js");
const multer = require("multer")

const storage = multer.diskStorage({
    destination:path.join(__dirname,"public/img"),
    filename: (req,file,cb) =>{
       cb(null,file.originalname) 
    }
})

//Declaraciones
app.set("puerto", process.env.PORT || 3000);


//Variables Globales
app.locals.formatearHora = function(hora)
{
    return timeago.format(hora, 'es_AR');
};

//MIDDLEWARES - Funciones que deben ejecutarse antes de cargarse las rutas.

//Multer -- Subir imagenes
app.use(multer({
    storage,
    dest: path.join(__dirname,"public/img"),
    limits : {fileSize:2000000}
}).single('image'))

//le especfico que las vistas estarán en la carpeta /vistas
app.set('views', path.join(__dirname, '/vistas'));
//le especifico que el motor de plantillas será ejs.
app.set('view engine', 'ejs');
//usamos la funcion express.static para especificar que la carpeta estatica será /public
app.use(express.static(__dirname + '/public'));
//usamos morgan en formato developer para que nos pase informacion de cada cosa que hacemos.
app.use(morgan("dev"));
//le decimos al servidor que vamos a usar json 
app.use(express.json());
//especificamos que vamos a poder recibir informacion del navegador, asi como inputs de formularios y demas
app.use(express.urlencoded({extended:false}));
app.use(busboy());
app.use(uploadfiles());
//los datos de session, para poder usar req.session y así manipular las sesiones de los usuarios.
app.use(session({
    name: "sesion",
    keys: ['clave1', 'clave2']
}));
//rutas
//le indicamos donde estarán las rutas
app.use("/", require("./rutas/index"));


//Configuraciones
//el servidor escuchará en tal puerto.
app.listen(app.get("puerto"), ()=>
{
    console.log("Servidor corriendo en el puerto " + app.get("puerto"));
})
