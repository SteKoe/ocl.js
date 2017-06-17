const webpackCommon = require('./webpack.config');

const configForExamples = {
    context: __dirname + "/examples",
    entry: "./examples.js",
    output: {
        path: __dirname + "/examples",
        filename: "examples.min.js"
    }
};

module.exports = Object.assign({}, webpackCommon, configForExamples);
