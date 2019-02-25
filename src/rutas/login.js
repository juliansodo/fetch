const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const {irAMiPerfil, irOtroPerfil, ActualizarDatos} = require('./funciones');
rutas.post("/login", (req,res) =>
{
    const {usuario, clave} = req.body;
    const existenciaUsuario = bd.query("SELECT COUNT(*) AS cantidad FROM usuarios WHERE usuario = ? ", [usuario], (errorU,filasU, columnasU)=>
    {
        if(!errorU)
        { 
            if(filasU[0].cantidad>0)
            {
                const existenciaClave = bd.query("SELECT COUNT(*) as cantidad, nombre, id, header,email,genero,web, nacimiento FROM usuarios WHERE usuario = ? AND clave = ? ", [usuario,clave], (errorC,filasC,columnasC)=>
                {
                    if(!errorC)
                    {
                        if(filasC[0].cantidad>0)
                        {
                            req.session.usuario = usuario;
                            req.session.clave = clave;
                            req.session.nombre = filasC[0].nombre;
                            req.session.id = filasC[0].id;
                            req.session.header = filasC[0].header;
                            req.session.email = filasC[0].email;
                            req.session.genero =  filasC[0].genero;
                            req.session.web = filasC[0].web;
                            req.session.fechaNacimiento =  filasC[0].nacimiento;
                            
                            res.redirect("/");
                            req.session = ActualizarDatos(req,res);
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
    const {usuario, clave, fullname, genero} = req.body;
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
        bd.query("INSERT INTO usuarios(usuario,clave,nombre, genero) VALUES(?,?,?, ?)", [usuario,clave,fullname, genero], (error,resultados,filas) =>
        {
            if(!error)
            {
                req.session.usuario = usuario;
                req.session.nombre = fullname;
                bd.query("SELECT id FROM usuarios WHERE usuario = ? ",[usuario] , (error,filas,columnas) =>
                {
                    if(!error)
                    {
                        
                        req.session.id = filas[0].id;
                        bd.query(" INSERT INTO imagenes(userID, tipo, url) VALUES (?, 1, 'no-user.png')", [req.session.id]);
                        ActualizarDatos(req,res);
                    }
                    else
                    {
                        console.log(error);
                    }
                }
                )
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