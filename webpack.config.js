const {VueLoaderPlugin} =  require("vue-loader");
module.exports = 
{
    entry: "./src/app/index.js",
    output: {
        path: __dirname + "/src/public/vue",
        filename: "vueConvertido.js"
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