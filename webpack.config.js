const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: "./lib/index",
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "ocl.min.js",
        libraryTarget: "umd",
        libraryExport: "OclEngine"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['env']
                    ]
                }
            }
        ]
    },
    plugins: [
        new MinifyPlugin({}, { comments: false })
    ],
};
