const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const {irAMiPerfil, irOtroPerfil, ActualizarDatos} = require('./funciones');
rutas.get("/preguntas" , (req,res) =>
{
    if(req.session.usuario) //si existe una session activa,
    {
        res.render("respuestas", {"titulo": "asd"}) //renderizo al usuario a su perfil
    }
    else
    {
        res.render("indexNOSync"); //si no, renderizo al usuario al index NO SINCRONIZADO
    }

});
module.exports = rutas;