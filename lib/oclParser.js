'use strict';

import AttributeCallExpression from './../lib/expressions/attributeCallExpression';
import ContextExpression from './../lib/expressions/contextExpression';
import ImpliesExpression from './../lib/expressions/impliesExpression';
import InvariantExpression from './../lib/expressions/invariantExpression';
import IsEmptyExpression from './../lib/expressions/isEmptyExpression';
import IteratorExpression from './../lib/expressions/iteratorExpression';
import NumberExpression from './../lib/expressions/numberExpression';
import OperationCallExpression from './../lib/expressions/operationCallExpression';
import StringExpression from './../lib/expressions/stringExpression';
import VariableExpression from './../lib/expressions/variableExpression';

const NumberPattern = `([\\d]+)`;
const StringPattern = `"([^"]*)"`;
const VariablePattern = `([\\w\\d]+\\.?)`;
const AttributePattern = `(([\\w\\d]*)\\.([\\w\\d]*))`;
const Expression = `${StringPattern}|${NumberPattern}|${AttributePattern}|${VariablePattern}`;

const InvariantExpressionPattern = `inv\\s*([\\w\\d]*)\\s*:(.*)`;
const FunctionCallExpressionPattern = `${AttributePattern}->([\\w]*)\\((.*)\\)`;
const OperationCallExpressionPattern = `(${Expression})\\s?(<=|>=|<>|=|<|>)\\s?(${Expression})`;
const IteratorExpressionPattern = `${AttributePattern}->forAll\\(([\\w\\d]*)\\s*(,\\s*([\\w\\d]*))?\\s*\\|([^)]*)\\)`;
const ImpliesExpressionPattern = `(${OperationCallExpressionPattern})\\simplies\\s(${OperationCallExpressionPattern})`;
const ContextExpressionPattern = `context\\s?(\\w*)`;

class OclParser {
    constructor(oclExpression) {
        this.oclExpression = OclParser.trimLeft(oclExpression.replace(/\n/g, ' '));
    }

    parse() {
        let oclExpression = OclParser.trimLeft(this.oclExpression),
            match,
            expr;

        if (match = OclParser.isExpression(ContextExpressionPattern, oclExpression)) {
            expr = new ContextExpression(match[1], this.parseInvariant(oclExpression.slice(match[0].length)));
        } else {
            throw new SyntaxError(`Unexpected syntax: '${oclExpression}'`);
        }

        return expr;
    }

    parseInvariant(oclExpression) {
        oclExpression = OclParser.trimLeft(oclExpression);
        let match;

        if (match = OclParser.isExpression(InvariantExpressionPattern, oclExpression)) {
            if (match[2]) {
                return new InvariantExpression(this.parsePartialOcl(match[2]), match[1]);
            }

            throw new SyntaxError('Invariant may not be empty if specified!');
        }

        return {};
    }

    parsePartialOcl(oclExpression) {
        oclExpression = OclParser.trimLeft(oclExpression);
        var match, expr;

        if (oclExpression.length === 0) {
            return {};
        }

        if (match = OclParser.isExpression(IteratorExpressionPattern, oclExpression)) {
            const iterators = [];
            match[4] ? iterators.push(match[4]) : '';
            match[6] ? iterators.push(match[6]) : '';
            expr = new IteratorExpression(this.parsePartialOcl(match[1]), iterators, this.parsePartialOcl(match[7]));
        }
        else if (match = OclParser.isExpression(ImpliesExpressionPattern, oclExpression)) {
            expr = new ImpliesExpression(this.parsePartialOcl(match[1]), this.parsePartialOcl(match[17]))
        }
        else if (match = OclParser.isExpression(FunctionCallExpressionPattern, oclExpression)) {
            expr = this.parseOclFunctionCall(oclExpression, match);
        }
        else if (match = OclParser.isExpression(OperationCallExpressionPattern, oclExpression)) {
            expr = new OperationCallExpression(match[8], this.parsePartialOcl(match[1]), this.parsePartialOcl(match[9]));
        }
        else if (match = OclParser.isExpression(NumberPattern, oclExpression)) {
            expr = new NumberExpression(match[1]);
        }
        else if (match = OclParser.isExpression(AttributePattern, oclExpression)) {
            expr = new AttributeCallExpression(match[2], match[3]);
        }
        else if (match = OclParser.isExpression(VariablePattern, oclExpression)) {
            expr = new VariableExpression(match[1]);
        }
        else {
            throw new SyntaxError(`Unexpected syntax: '${oclExpression}'`);
        }

        return expr;
    }

    parseOclFunctionCall(oclExpression, match) {
        let functionName = match[4].toLowerCase();

        if(functionName === 'isempty') {
            return new IsEmptyExpression()
        }

        return new ImpliesExpression(this.parsePartialOcl(match[1]), this.parsePartialOcl(match[17]))
    }

    static trimLeft(string) {
        return string.replace(/^\s*/, '').trim();
    }

    static isExpression(regex, expression) {
        return new RegExp(`^${regex}`, 'i').exec(expression);
    }
}

export default OclParser