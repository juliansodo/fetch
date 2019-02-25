const {VueLoaderPlugin} =  require("vue-loader");
module.exports = 
{
    entry: {
        indexSync: "./src/app/indexSync.js",
        indexNoSync: "./src/app/indexNoSync.js",
        MiPerfil: "./src/app/MiPerfil.js",
        Registro: "./src/app/Registro.js",
        EditarPerfil:"./src/app/EditarPerfil.js",
        Perfiles:"./src/app/Perfiles.js",
        Servicios:"./src/app/Servicios.js"
    },
    output: {
        path: __dirname + "/src/public/vue",
        filename: "[name].js"
    },
    module:
    {
        rules: [
            {
                test: /\.js$/, //leer todos los archivos que tengan formato .js
                exclude: /node_modules/, //excluyendo la propia node_modules
                use:
                {
                    loader: 'babel-loader' //usando babel loader -- LOADER ES EL QUE FORMATEA EL CODIGO A JS
                }
            },
        {
            test: /\.vue$/, //LEER TODOS LOS ARCHIVOS QUE TENGAN FORMATO .VUE
            loader: 'vue-loader' //USANDO EL PROPIO VUE LOADER
        }
        ]
    },
    plugins:
    [
        new VueLoaderPlugin()
    ]
};