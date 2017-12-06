const webpack = require('webpack');
var config = {
    entry: {
        app: './billing/js/bills_original.js',
        bootstrap: './billing/js/bootstrap.js',
    },

    output: {
        path: '/var/www/billing/billing/js',
        filename: './bundle.js',
    },
    //    plugins: [ new UglifyJSPlugin()],
    devServer: {
        inline: true,
        port: 8080
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: [["es2015", { "modules": false }]]
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'bootstrap', filename: 'main.js' })//here I specify the filename in this case it is the vendor in entry above
    ]
}
module.exports = config;
