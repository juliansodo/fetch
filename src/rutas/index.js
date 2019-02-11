const express = require("express");
const rutas = express.Router();
const bd = require("../db");
const archivos = require("fs");
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
    irAMiPerfil(req,res);
});

rutas.get("/preguntas" , (req,res) =>
{
    res.render("respuestas", {"titulo": "asd"})
});

rutas.get("/salir" , (req,res) =>
{
    req.session = undefined;
    res.redirect("/");
});


rutas.get("/respuestas" , (req,res) =>
{
    res.render("respuestas", {"titulo": "asd"})
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
                const existenciaClave = bd.query("SELECT COUNT(*) as cantidad, nombre, id, header FROM usuarios WHERE usuario = ? AND clave = ? ", [usuario,clave], (errorC,filasC,columnasC)=>
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
                        console.log(filas[0].id)
                        req.session.id = filas[0].id;
                        bd.query(" INSERT INTO imagenes(userID, tipo, url) VALUES (?, 1, 'no-user.png')", [req.session.id]);
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


rutas.get("/editarPerfil", (req,res) =>
{
    const usuario = req.session;
    res.render("editarPerfil", {usuario : usuario});
});


/*-------------------------------------------------->EDITAR PERFIL<-------------------------------------------*/
rutas.post("/editarPerfil", async(req,res)=>
{
    const nombreArchivo = Date.now() + "_" + req.session.usuario+".jpg";
    console.log(req.files)
    if(req.files)
    {
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
    return irAMiPerfil(req,res);
}) 


/*---------------------------------------------------->POSTEOS<-----------------------------------------------*/
rutas.post("/post" , (req,res) =>
{
    if(req.session.usuario)
    {
        const {post} = req.body;
        const userID = req.session.id;
     
        if(post.length > 0 && post.length <=200)
        {
            bd.query("INSERT INTO posts(userID, texto) VALUES(?,?)", [userID, post], (error,filas, columnas) =>
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

/*------------------------------------------->PERFILES<------------------------------------------*/
rutas.get("/perfiles/:usuario", (req,res) =>
{
    if(req.params.usuario == req.session.usuario)
    {
        irAMiPerfil(req,res);
    }
 else
 {
    irOtroPerfil(req, res);
 }
});

/*----------------------------------------------------->FUNCIONES<------------------------------------*/
function irAMiPerfil(req,res)
{
    var perfil, posts, recomendados;
    const usuario = req.session.usuario;
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
module.exports = rutas;