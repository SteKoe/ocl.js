const fs = require("fs");
const path = require("path");
const jison = require("jison");
const bnf = fs.readFileSync(path.resolve(__dirname, 'grammar.jison'), "utf8");
const parser = new jison.Parser(bnf);

const parserOutputFile = path.resolve('./lib/parser.js');

export default class OclParserGenerator {
    static generate() {
        const imports = [
            "import AndExpression from './../lib/expressions/andExpression';",
            "import OrExpression from './../lib/expressions/orExpression';",
            "import ExistsExpression from './../lib/expressions/existsExpression';",
            "import ContextExpression from './../lib/expressions/contextExpression';",
            "import ImpliesExpression from './../lib/expressions/impliesExpression';",
            "import InvariantExpression from './../lib/expressions/invariantExpression';",
            "import IsEmptyExpression from './../lib/expressions/isEmptyExpression';",
            "import IsNotEmptyExpression from './../lib/expressions/isNotEmptyExpression';",
            "import IteratorExpression from './../lib/expressions/iteratorExpression';",
            "import LetExpression from './../lib/expressions/letExpression';",
            "import NumberExpression from './../lib/expressions/numberExpression';",
            "import OperationCallExpression from './../lib/expressions/operationCallExpression';",
            "import StringExpression from './../lib/expressions/stringExpression';",
            "import BooleanExpression from './../lib/expressions/booleanExpression';",
            "import VariableExpression from './../lib/expressions/variableExpression';",
            "import NilExpression from './../lib/expressions/nilExpression';",
            "import SizeExpression from './../lib/expressions/sizeExpression';",
            "import {UnionOperation, AtOperation, FirstOperation, LastOperation} from './../lib/expressions/sequenceExpressions';",
            "import SelectExpression from './../lib/expressions/selectExpression';"
        ].join('\n');

        fs.writeFileSync(parserOutputFile, [imports, parser.generate()].join('\n\n'), 'utf8')
    }
}