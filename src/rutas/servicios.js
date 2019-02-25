const express = require("express");
const rutas = express.Router();
const bd = require("../db");
rutas.use(require('./api_fb'));

rutas.get("/servicios", (req,res) =>
{
    res.render("servicios")
});


rutas.post("/NuevoServicio", (req,res)=>
{
    if(!req.session.usuario){return;}
    const {tipo, token} = req.body;
    if(tipo == undefined || token == undefined){res.json({Puerta:0, Error:"No se pudo establecer la solicitud, inténtelo en unos minutos"}); return 1;}
    bd.query("CALL NuevoServicio(?,?,?)", [req.session.id, tipo, token],(err, filas)=>
    {
        if(err){console.log(err); res.json({Puerta:0, Error:"Error en la base de datos"})}
        if(filas[0].Puerta == 0)
        {
            res.json(filas[0]);
        }
        else if(filas[0].Puerta == 1)
        {
            res.redirect("/dashboard");
        }
    });
});

rutas.get("/getServicios", (req,res) =>
{
    bd.query("SELECT * FROM serviciostipo WHERE activo = 1", (error,filas)=>
    {
        if(!error)
        {
            res.send(filas);
        }        
    })
    return;
});

module.exports = rutas;