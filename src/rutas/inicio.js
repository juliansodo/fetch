const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const {irAMiPerfil, irOtroPerfil, ActualizarDatos, formatearHora} = require('./funciones');


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

rutas.get("/cargarPosts", (req,res) =>
{
    const perfil = req.session;
    bd.query("CALL posts_prop_seguid(?)", [req.session.id], (error, filas, campos)=>
    {
        if(error){console.log(error); return 1;}
        var resultados = filas[0];
        for(var i=0; i<resultados.length; i++)
        {
            resultados[i].fecha = formatearHora(resultados[i].fecha);
        }
        
        res.send(resultados);
    });
});


rutas.get("/cargarRecomendados", (req,res)  =>
{
    if(!req.session.usuario)
    {return 1;}
    const recomendadosQuery = bd.query(`SELECT usuarios.usuario, usuarios.nombre, usuarios.id, imagenes.url as perfil_img FROM usuarios INNER JOIN imagenes ON imagenes.userID = usuarios.id WHERE usuarios.id <> ?  ORDER BY RAND() LIMIT 3`,[req.session.id], (errorRec,filasRec, camposRec) =>
    {
        if(errorRec)
        {
            console.log(error);
        }
        else
        {
            recomendados = filasRec;
            
            res.send(recomendados);
        }
    });
});
module.exports = rutas;
