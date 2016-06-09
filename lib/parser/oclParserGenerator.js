const fs = require("fs");
const path = require("path");
const jison = require("jison");
const bnf = fs.readFileSync(path.resolve(__dirname, 'grammar.jison'), "utf8");
const parser = new jison.Parser(bnf);

const parserOutputFile = path.resolve(__dirname, 'parser.js');
console.log(parserOutputFile);

export default class OclParserGenerator {
    static generate() {
        const imports = [
            "import * as Math from './expressions/mathExpressions';",
            "import AndExpression from './expressions/andExpression';",
            "import OrExpression from './expressions/orExpression';",
            "import ExistsExpression from './expressions/existsExpression';",
            "import ContextExpression from './expressions/contextExpression';",
            "import ImpliesExpression from './expressions/impliesExpression';",
            "import InvariantExpression from './expressions/invariantExpression';",
            "import IsEmptyExpression from './expressions/isEmptyExpression';",
            "import IsNotEmptyExpression from './expressions/isNotEmptyExpression';",
            "import IteratorExpression from './expressions/iteratorExpression';",
            "import LetExpression from './expressions/letExpression';",
            "import NumberExpression from './expressions/numberExpression';",
            "import OperationCallExpression from './expressions/operationCallExpression';",
            "import StringExpression from './expressions/stringExpression';",
            "import BooleanExpression from './expressions/booleanExpression';",
            "import VariableExpression from './expressions/variableExpression';",
            "import NilExpression from './expressions/nilExpression';",
            "import SizeExpression from './expressions/sizeExpression';",
            "import {UnionOperation, AtOperation, FirstOperation, LastOperation, AsSetOperation} from './expressions/sequenceExpressions';",
            "import SelectExpression from './expressions/selectExpression';"
        ].join('\n');

        fs.writeFileSync(parserOutputFile, [imports, parser.generate()].join('\n\n'), 'utf8')
    }
}