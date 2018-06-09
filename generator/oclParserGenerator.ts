/// <reference path="../node_modules/@types/node/index.d.ts" />
const fs = require("fs");
const path = require("path");
const jison = require("jison-gho");

const bnf = fs.readFileSync(path.resolve(__dirname, 'grammar.jison'), "utf8");
const parser = new jison.Parser(bnf);

const parserOutputFile = path.resolve('./generator/Parser.js');

let leParser = parser.generate({
    moduleType: 'js'
});

fs.writeFileSync(parserOutputFile, [leParser, 'module.exports = parser;'].join('\n'), 'utf8');
