const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const {irAMiPerfil, irOtroPerfil, ActualizarDatos} = require('./funciones');
/*------------------------------------------->PERFILES<------------------------------------------*/
rutas.get("/perfiles/:usuario", (req,res) =>
{
    if(req.params.usuario == req.session.usuario)
    {
        irAMiPerfil(req,res);
    }
 else
 {
    irOtroPerfil(req, res);
 }
});

module.exports = rutas;