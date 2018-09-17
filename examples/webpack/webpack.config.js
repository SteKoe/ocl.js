const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.(ocl)$/i,
                use: [
                    'raw-loader'
                ]
            },
            {
                test: /\.(html)$/i,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html")
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false
                }
            }
        })
    ]
};
