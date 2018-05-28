const fs = require("fs");
const path = require("path");
const jison = require("jison-gho");

const bnf = fs.readFileSync(path.resolve(__dirname, 'grammar.jison'), "utf8");
const parser = new jison.Parser(bnf);
const parserOutputFile = path.resolve('./lib/components/parser/Parser.js');

const imports = [
    "import * as Expression from '../Expressions';"
].join('\n');

let generatedParser = parser.generate({moduleType: 'js'});

console.log(generatedParser);

fs.writeFileSync(parserOutputFile, [imports, generatedParser, 'module.exports = parser;'].join('\n\n'), 'utf8');
