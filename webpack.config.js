const path = require('path');

module.exports = {
    entry: "./lib/index",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "ocl.min.js",
        libraryTarget: "umd"
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
    }
};
