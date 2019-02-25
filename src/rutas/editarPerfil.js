const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const path = require("path");
const archivos = require("fs");
const {irAMiPerfil, irOtroPerfil, ActualizarDatos} = require('./funciones');

rutas.get("/editarPerfil", (req,res) =>
{
    if(!req.session.usuario){return;}
    res.render("editarPerfil");
});

rutas.get("/getEditarPerfil", (req,res) =>
{
    if(!req.session.usuario){return 1;}
    const usuario = req.session;
    res.send(usuario);
});

rutas.post("/subirImagen",(req,res)=>
{
    if(!req.session.usuario){return;}
    console.log(req.file);
    
})

rutas.post("/setEditarPerfil", async(req,res)=>
{
    //console.log(req.file)
    if(!req.session.usuario){return;}
    var error,mensaje;

    console.log(req.body)
    if(req.file)
    {
         const nombreArchivo = req.session.fechaImagen + "_" + req.session.usuario+".jpg";
         
         bd.query("SELECT url FROM imagenes WHERE userID = ?", [req.session.id], (error, resultados, campos) =>
        {
            if(!error)
            {
                for(resultado of resultados)
                {
                     archivos.unlink(path.join(__dirname,"../public/img",resultado.url),(error)=>
                     {
                         if(error)
                         {
                             console.log(error);
                             return;
                         }
                         else
                         {
                             console.log("listo")
                         }
                     })
                }
            }
            else
            {
                console.log(error);
                return;
            }
        });
             bd.query("UPDATE imagenes set url = ? WHERE userID = ? ", [nombreArchivo, req.session.id], (error, filas,columnas)=>
            {
                if(error)
                {
                    console.log(error)
                }
            });
    }

            if(req.body.clave.length>0)
            {
                if(req.body.clave.length >=6 && req.body.clave.length<=12)
                {
                    bd.query("UPDATE usuarios SET usuarios.clave = ? WHERE usuarios.id = ?", [req.body.clave, req.session.id]);
               
                }
                else
                {
                    error=2;
                    mensaje = mensaje+" La contraseña debe tener entre 6 y 12 caracteres \n";
                    let estados=
                    {
                        estado:error,
                        mensaje:mensaje
                    }
                    res.render("perfil", {estados});
                    req.session = ActualizarDatos(req,res)
                    return;
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
                    error=2;
                    mensaje = mensaje+" Ese nombre de usuario ya existe, elija otro. \n";
                    let estados=
                    {
                        estado:error,
                        mensaje:mensaje
                    }
                    res.render("perfil", {estados});
                    req.session = ActualizarDatos(req,res)
                    return;
                }
            }
            else
            {
                mensaje = mensaje+" El usuario no puede tener cero caracteres, ni tampoco superar el limite (12 caracteres). \n";
            }
        });
        bd.query("UPDATE usuarios set header = ?,  genero = ?, email = ?, web = ?  WHERE id = ?", [req.body.header, req.body.genero, req.body.email, req.body.web, req.session.id], (error, filas, campos) =>
        {
            if(error)
            {    
                error=2;
                mensaje = mensaje+"Se produjo un error, vuelva a intentarlo. \n";
                let estados=
                    {
                        estado:error,
                        mensaje:mensaje
                    }
                    res.render("perfil", {estados});
                    req.session = ActualizarDatos(req,res)
                return;
            }
        });        
    }
    req.session= ActualizarDatos(req,res)
    error=1;
    mensaje="El perfil se ha actualizado satisfactoriamente!"
    let estados=
        {
            estado:error,
            mensaje:mensaje
        }
        res.render("perfil", {estados});
    return;
});

module.exports = rutas;