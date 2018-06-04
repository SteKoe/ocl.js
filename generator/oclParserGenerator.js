const fs = require("fs");
const path = require("path");
const jison = require("jison-gho");

const bnf = fs.readFileSync(path.resolve(__dirname, 'grammar.jison'), "utf8");
const parser = new jison.Parser(bnf);
const parserOutputFile = path.resolve('./lib/components/parser/Parser.js');

const imports = [
    "import * as Expression from '../expressions';"
].join('\n');

fs.writeFileSync(parserOutputFile, [imports, parser.generate({
    moduleType: 'js',
    debug: true
}), 'module.exports = parser;'].join('\n\n'), 'utf8');
