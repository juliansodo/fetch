const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const {irAMiPerfil, irOtroPerfil, ActualizarDatos, CargarMiPerfil, formatearHora} = require('./funciones');
rutas.get("/perfil" , (req,res) =>
{
    if(req.session.usuario) //si existe una session activa,
    {
         res.render("perfil");
      // irAMiPerfil(req,res); //renderizo al usuario a su perfil
    }
    else
    {
        res.render("indexNOSync"); //si no, renderizo al usuario al index NO SINCRONIZADO
    }
   
});


rutas.get("/getPostsMiPerfil", (req,res)=>
{
    if(!req.session.usuario) //si existe una session activa,
    {
        return 1;
    }
    bd.query("CALL postscompletos(?) ", [req.session.id], (error,filas, campos)=>
    {
        if(!error)
        {
            var resultados = filas[0];
            for(var i=0; i<resultados.length; i++)
            {
                resultados[i].fecha = formatearHora(resultados[i].fecha);
            }
            res.send(resultados)
        }
    });

});

rutas.get("/CargarMiPerfil" , (req,res) =>
{
    if(req.session.usuario) //si existe una session activa,
    {
        //  res.render("perfil");
      CargarMiPerfil(req,res); //renderizo al usuario a su perfil
    }
    else
    {
        res.render("indexNOSync"); //si no, renderizo al usuario al index NO SINCRONIZADO
    }
});

module.exports = rutas;