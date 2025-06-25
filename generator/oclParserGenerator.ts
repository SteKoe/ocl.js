import * as fs from 'fs';
import * as path from 'path';
import * as jison from 'jison-gho';

const bnf = fs.readFileSync(path.resolve(__dirname, 'grammar.jison'), 'utf8');
const parser = new jison.Parser(bnf);

const parserOutputFile = path.resolve('./generator/Parser.js');

const leParser = parser.generate({moduleType: "js"});

const data = `
${leParser}

module.exports = parser;
`;
fs.writeFileSync(parserOutputFile, data, 'utf8');
