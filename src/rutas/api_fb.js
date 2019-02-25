const express = require("express");
const rutas = express.Router();
const bd = require("../db");

const execute_FB = 
{
    response:[],
    buscarGrupos: (token)=>
    {
        let accesstoken = "&access-token="+token;
        fetch("https://graph.facebook.com/groups/"+accesstoken)
        .then(res=>res.json())
        .then(data=>
            this.response = data
        )
    },
}


module.exports = rutas;
