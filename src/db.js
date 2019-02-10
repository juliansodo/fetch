const mysql = require("mysql");
const cnDB = require("./cnDB");

const conexion = mysql.createConnection(cnDB);

conexion.connect((err,conex) =>
{
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log("Base de datos corriendo satisfactoriamente.")
    }
})
module.exports = conexion;