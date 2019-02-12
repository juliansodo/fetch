
const express = require("express");
const rutas = express.Router();
const bd = require("../db");
/*----------------------------------------------------->FUNCIONES<------------------------------------*/
function irAMiPerfil(req,res)
{
    var perfil, posts, recomendados;
    const usuario = req.session.usuario;
    const query = bd.query(`SELECT usuarios.*, 
                            imagenes.url AS perfil_img 
                            FROM usuarios 
                            INNER JOIN imagenes on imagenes.userID = usuarios.id
                            WHERE imagenes.tipo = 1 AND usuarios.usuario = ?`, [usuario], async(error, filas,columnas)=>
                            {
                                if(!error)  
                                {
                                     perfil = filas[0];

                                     //const postsQuery = bd.query(`SELECT posts.*, usuarios.usuario, usuarios.nombre, imagenes.url as perfil_img from posts INNER JOIN usuarios ON usuarios.id = posts.userID INNER JOIN imagenes ON imagenes.userID = posts.userID WHERE posts.userID = ? ORDER BY fecha desc LIMIT 10`, [perfil.id], (errorPosts,filasPosts, camposPosts) =>
                                     let sql = `CALL postscompletos(?)`;
                                     const postsQuery = await  bd.query(sql, perfil.id, (errorPosts,filasPosts, camposPosts) =>
                                     {
                                       if(errorPosts)
                                       {
                                           console.log(errorPosts);
                                       }
                                       else
                                       {
                                        console.log()
                                        posts = filasPosts;
                                       }
                                     });
                                     const recomendadosQuery = bd.query(`SELECT usuarios.usuario, usuarios.nombre, usuarios.id, imagenes.url as perfil_img FROM usuarios INNER JOIN imagenes ON imagenes.userID = usuarios.id WHERE usuarios.id <> ? ORDER BY RAND() LIMIT 3`, [req.session.id], (errorRec,filasRec, camposRec) =>
                                     {
                                         if(errorRec)
                                         {
                                             console.log(error);
                                         }
                                         else
                                         {
                                             recomendados = filasRec;
                                             res.render("perfil", {perfil:perfil, posts:posts, recomendados:recomendados});
                                         }
                                     });
                                   
                                }
                            });
}

function irOtroPerfil(req,res)
{
    
    var perfil, posts, recomendados;
    const usuario = req.params.usuario;
    const query = bd.query(`SELECT usuarios.*, 
                            imagenes.url AS perfil_img 
                            FROM usuarios 
                            INNER JOIN imagenes on imagenes.userID = usuarios.id
                            WHERE imagenes.tipo = 1 AND usuarios.usuario = ?`, [usuario], (error, filas,columnas)=>
                            {
                                if(!error)  
                                {
                                     perfil = filas[0];
                                     const postsQuery = bd.query(`SELECT posts.*, usuarios.usuario, usuarios.nombre, imagenes.url as perfil_img from posts INNER JOIN usuarios ON usuarios.id = posts.userID INNER JOIN imagenes ON imagenes.userID = posts.userID WHERE posts.userID = ? ORDER BY fecha desc LIMIT 10`, [perfil.id], (errorPosts,filasPosts, camposPosts) =>
                                     {
                                        posts = filasPosts;
                                     });

                                     const recomendadosQuery = bd.query(`SELECT usuarios.usuario, usuarios.nombre, usuarios.id, imagenes.url as perfil_img FROM usuarios INNER JOIN imagenes ON imagenes.userID = usuarios.id  ORDER BY RAND() LIMIT 3`, (errorRec,filasRec, camposRec) =>
                                     {
                                         if(errorRec)
                                         {
                                             console.log(error);
                                         }
                                         else
                                         {
                                            console.log(posts)
                                             recomendados = filasRec;
                                             
                                             res.render("perfilOtros", {perfil:perfil, posts:posts, recomendados:recomendados});
                                         }
                                     });
                                   
                                }
                            });
}

function ActualizarDatos(req,res)
{
    bd.query("SELECT COUNT(*) as cantidad, nombre, id, header FROM usuarios WHERE usuario = ? AND clave = ? ", [req.session.usuario,req.session.clave], (errorC,filasC,columnasC)=>
    {
        req.session = filasC[0];
    });
}

module.exports = 
{   rutas,
    ActualizarDatos,
    irAMiPerfil,
    irOtroPerfil
};