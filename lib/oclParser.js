'use strict';
const fs = require("fs");
const path = require("path");
const jison = require("jison");
const bnf = fs.readFileSync(path.resolve(__dirname, 'grammar.jison'), "utf8");
const parser = new jison.Parser(bnf);

import AttributeCallExpression from './../lib/expressions/attributeCallExpression';
import ContextExpression from './../lib/expressions/contextExpression';
import ImpliesExpression from './../lib/expressions/impliesExpression';
import InvariantExpression from './../lib/expressions/invariantExpression';
import IsEmptyExpression from './../lib/expressions/isEmptyExpression';
import IsNotEmptyExpression from './../lib/expressions/isNotEmptyExpression';
import IteratorExpression from './../lib/expressions/iteratorExpression';
import NumberExpression from './../lib/expressions/numberExpression';
import OperationCallExpression from './../lib/expressions/operationCallExpression';
import StringExpression from './../lib/expressions/stringExpression';
import BooleanExpression from './../lib/expressions/booleanExpression';
import VariableExpression from './../lib/expressions/variableExpression';

export default class OclParser {
    constructor(oclExpression) {
        this.oclExpression = oclExpression;
    }

    parse() {
        return parser.parse(this.oclExpression);
    }
}