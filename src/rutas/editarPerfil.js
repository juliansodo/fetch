const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const {irAMiPerfil, irOtroPerfil, ActualizarDatos} = require('./funciones');
rutas.get("/editarPerfil", (req,res) =>
{
    const usuario = req.session;
    res.render("editarPerfil", {usuario : usuario});
});

rutas.post("/editarPerfil", async(req,res)=>
{
    var mensaje="";
    var error = false;
    if(req.files)
    {
         const nombreArchivo = Date.now() + "_" + req.session.usuario+".jpg";
         console.log(req.files.imagen)
        await bd.query("SELECT url FROM imagenes WHERE userID = ?", [req.session.id], async(error, resultados, campos) =>
        {
            if(!error)
            {
                for(resultado in resultados)
                {
                    await archivos.unlink("/public/img/?", [resultados[resultado].url]);
                }
            }
            else
            {
                console.log(error)
            }
        });
        let fotoperfil = req.files.imagen;
        fotoperfil.mv("/public/img/?", [nombreArchivo], async(error)=>
        {
            if(error){console.log(error); return 0;}
            await bd.query("UPDATE imagenes set url = ? WHERE userID = ? ", [nombreArchivo, req.secure.id], (error, filas,columnas)=>
            {
                if(error)
                {
                    console.log(error)
                }
            });
        });
    }

            if(req.body.clave.length>0)
            {
                if(req.body.clave.length >=6 && req.body.clave.length<=12)
                {
                    bd.query("UPDATE usuarios SET usuarios.clave = ? WHERE usuarios.id = ?", [req.body.clave, req.session.id]);
                    mensaje = mensaje+" La contraseña se ha modificado correctamente \n";
                }
                else
                {
                    error=true;
                    mensaje = mensaje+" La contraseña debe tener entre 6 y 12 caracteres \n";
                }
           
        const verificarUsuario = bd.query("SELECT  COUNT(id) as Cantidad FROM usuarios WHERE usuarios.usuario = ? AND usuarios.id <> ? ", [req.body.usuario, req.session.id], (errorUsuario,filasUsuario, camposUsuario) =>
        {
            if(req.body.usuario.length>0 && req.body.usuario.length<12)
            {
                if(filasUsuario[0].Cantidad == 0)
                {
                    bd.query("UPDATE usuarios SET usuario = ? WHERE id = ?", [req.body.usuario, req.session.id]);
                }
                else
                {
                    error=true;
                    mensaje = mensaje+" Ese nombre de usuario ya existe, elija otro. \n";
                }
            }
            else
            {
                mensaje = mensaje+" El usuario no puede tener cero caracteres, ni tampoco superar el limite (12 caracteres). \n";
            }
        });
        bd.query("UPDATE usuarios set header = ?,  genero = ? WHERE id = ?", [req.body.header, req.body.genero, req.session.id], (error, filas, campos) =>
        {
            if(error)
            {    
                 error=true;
                mensaje = mensaje+"Se produjo un error, vuelva a intentarlo. \n";
            }
        });        
    }
    ActualizarDatos(req,res);
    res.render("editarPerfil", {error: error, mensaje:mensaje, usuario:req.session});
});

module.exports = rutas;