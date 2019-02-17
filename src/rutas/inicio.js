const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const {irAMiPerfil, irOtroPerfil, ActualizarDatos, formatearHora, SeguirUsuario} = require('./funciones');


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
    const recomendadosQuery = bd.query(`SELECT usuarios.id, usuarios.usuario, usuarios.nombre, usuarios.id, imagenes.url as perfil_img FROM usuarios INNER JOIN imagenes ON imagenes.userID = usuarios.id WHERE usuarios.id <> ?  ORDER BY RAND() LIMIT 3`,[req.session.id], (errorRec,filasRec, camposRec) =>
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


rutas.get("/getEstadisticas", (req,res) =>
{
    if(!req.session.usuario)
    {return 1;}
    const estadisticasQuery = bd.query(`select  usuarios.seguidos, usuarios.seguidores, usuarios.preguntas, usuarios.preguntas_respondidas, usuarios.preguntas_rechazadas, usuarios.preguntas_puntaje, usuarios.posts, usuarios.reposts, usuarios.favoritos FROM usuarios WHERE usuarios.id = ? `,[req.session.id], (errorRec,filasRec, camposRec) =>
    {
        if(errorRec)
        {
            console.log(errorRec);
        }
        else
        {
            recomendados = filasRec[0];
            
            res.send(recomendados);
        }
    });

})

rutas.post("/seguirusuario", (req,res)=>
{
    SeguirUsuario(req,res);
});
module.exports = rutas;
