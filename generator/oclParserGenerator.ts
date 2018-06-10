import * as fs from 'fs';
import * as path from 'path';
import * as jison from 'jison-gho';

const bnf = fs.readFileSync(path.resolve(__dirname, 'grammar.jison'), 'utf8');
const parser = new jison.Parser(bnf);

const parserOutputFile = path.resolve('./generator/Parser.js');

const leParser = parser.generate({
    moduleType: 'js'
});

fs.writeFileSync(parserOutputFile, [leParser, 'module.exports = parser;'].join('\n'), 'utf8');
