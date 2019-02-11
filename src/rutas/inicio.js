const express = require("express");
const rutas = express.Router();
const bd = require("../db");
rutas.get("/" , (req,res) =>
{
    if(req.session.usuario) //si existe una session activa,
    {
        res.render("indexSync"); //renderizo al usuario al index SINCRONIZADO
    }
    else
    {
        res.render("indexNOSync"); //si no, renderizo al usuario al index NO SINCRONIZADO
    }
});
module.exports = rutas;
