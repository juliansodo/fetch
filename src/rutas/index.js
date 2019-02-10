const express = require("express");
const rutas = express.Router();
const bd = require("../db");
rutas.get("/" , (req,res) =>
{
    if(req.session.usuario)
    {
        res.render("indexSync");
    }
    else
    {
        res.render("indexNOSync");
    }
});

rutas.get("/perfil" , (req,res) =>
{
    res.render("perfil", {"titulo": "asd"})
});

rutas.get("/preguntas" , (req,res) =>
{
    res.render("perfil", {"titulo": "asd"})
});

rutas.get("/salir" , (req,res) =>
{
    req.session = undefined;
    res.redirect("/");
});


rutas.get("/respuestas" , (req,res) =>
{
    res.render("perfil", {"titulo": "asd"})
});


rutas.post("/login", (req,res) =>
{
    const {usuario, clave} = req.body;
    const existenciaUsuario = bd.query("SELECT COUNT(*) AS cantidad FROM usuarios WHERE usuario = ? ", [usuario], (errorU,filasU, columnasU)=>
    {
        if(!errorU)
        { 
            if(filasU[0].cantidad>0)
            {
                const existenciaClave = bd.query("SELECT COUNT(*) as cantidad, nombre FROM usuarios WHERE usuario = ? AND clave = ? ", [usuario,clave], (errorC,filasC,columnasC)=>
                {
                    if(!errorC)
                    {
                        if(filasC[0].cantidad>0)
                        {
                            req.session.usuario = usuario;
                            req.session.clave = clave;
                            req.session.nombre = filasC[0].nombre;
                            res.redirect("/");
                        }
                        else
                        {
                            let error = 
                            {
                                titulo : "La contraseña no es correcta."
                            }
                            res.render("registro", {errorLogin: error});
                        }
                    }
                    else
                    {
                        
                        let error = 
                        {
                            titulo : "Se produjo un error, intentelo nuevamente mas tarde."
                        }
                        res.render("registro", {errorLogin: error});
                    }
                });
            }
            else
            {
                let error = 
                {
                    titulo : "El usuario no es correcto."
                }
                res.render("registro", {errorLogin: error});
            }
        }
        else
        {
            let error = 
            {
                titulo : "Se produjo un error, intentelo nuevamente mas tarde."
            }
            console.log()
            res.render("registro", {errorLogin: error}); 
        }   
    });
});

rutas.get("/ingreso", (req,res) =>
{
    
    error = 
    {
        titulo: ""
    }
    res.render("registro", {error:error});
});

rutas.post("/ingreso", (req,res) =>
{
    const {usuario, clave, fullname} = req.body;
    console.log(req.body)
    const existencia = bd.query("SELECT count(*) as cantidad FROM usuarios WHERE usuario = ?", [usuario],(error, filas, columnas) =>
    {
          
    if(filas[0].cantidad>0)
    {
        errores = 
        {
            titulo: "Ya existe ese nombre de usuario"
        }
        res.render("registro", {errorRegistro:errores});
    }
    else
    {
        bd.query("INSERT INTO usuarios(usuario,clave,nombre) VALUES(?,?,?) ", [usuario,clave,fullname], (error,resultados,filas) =>
        {
            if(!error)
            {
                req.session.usuario = usuario;
                req.session.nombre = fullname;
                
                res.redirect("/");
            }
            else
            {
                console.log(error);
            }
        });
    }
    });
  
});
module.exports = rutas;