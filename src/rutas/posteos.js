const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const {irAMiPerfil, irOtroPerfil, ActualizarDatos} = require('./funciones');
/*---------------------------------------------------->POSTEOS<-----------------------------------------------*/
rutas.post("/post" , (req,res) =>
{
    if(req.session.usuario)
    {
        const {post} = req.body;
        const userID = req.session.id;
        console.log(post)
        if(post.length > 0 && post.length <=200)
        {
            bd.query("INSERT INTO posts(userID, texto) VALUES((SELECT id FROM usuarios where usuarios.usuario = ?),?)", [req.session.usuario, post], (error,filas, columnas) =>
            {
                if(!error)
                {
                    bd.query("UPDATE usuarios SET posts = posts+1");
                    irAMiPerfil(req,res);
                }
                else
                {
                    console.log(error)
                }
            });
        }        
    } 
    else
    {

    }
});
module.exports = rutas;