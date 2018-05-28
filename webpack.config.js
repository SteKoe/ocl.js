const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'lib'),
    entry: "./index",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "ocl.min.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
};
