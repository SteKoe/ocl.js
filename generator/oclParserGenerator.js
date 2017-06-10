const fs = require("fs");
const path = require("path");
const jison = require("jison");

const bnf = fs.readFileSync(path.resolve(__dirname, 'grammar.jison'), "utf8");
const parser = new jison.Parser(bnf);
const parserOutputFile = path.resolve('./src/components/parser/parser.js');

const imports = [
    "import * as Expression from '../expressions';"
].join('\n');

fs.writeFileSync(parserOutputFile, [imports, parser.generate({moduleType: 'js'}), 'module.exports = parser;'].join('\n\n'), 'utf8');

module.exports = function() {

};