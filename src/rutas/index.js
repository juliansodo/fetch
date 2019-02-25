const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const archivos = require("fs"); //modulo para manipular archivos
rutas.use(require('./inicio'));
rutas.use(require('./perfil'));
rutas.use(require('./preguntas'));
rutas.use(require('./respuestas'));
rutas.use(require('./login'));
rutas.use(require('./posteos'));
const {irAMiPerfil, irOtroPerfil, ActualizarDatos} = require('./funciones');
rutas.use(require('./editarPerfil'));
rutas.use(require('./perfiles'));
rutas.use(require('./servicios'));

rutas.get("/salir" , (req,res) =>
{
    req.session = undefined;
    res.redirect("/");
});



module.exports = rutas;