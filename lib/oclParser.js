'use strict';

import AttributeCallExpression from './expressions/attributeCallExpression';
import ContextExpression from './expressions/contextExpression';
import ImpliesExpression from './expressions/impliesExpression';
import InvariantExpression from './expressions/invariantExpression';
import IteratorExpression from './expressions/iteratorExpression';
import NumberExpression from './expressions/numberExpression';
import OperationCallExpression from './expressions/operationCallExpression';
import StringExpression from './expressions/stringExpression';
import VariableExpression from './expressions/variableExpression';

const NumberPattern = `([\\d]+)`;
const StringPattern = `"([^"]*)"`;
const VariablePattern = `([\\w\\d]+\\.?)`;
const AttributePattern = `(([\\w\\d]*)\\.([\\w\\d]*))`;
const Expression = `${StringPattern}|${NumberPattern}|${AttributePattern}|${VariablePattern}`;

const InvariantExpressionPattern = `inv\\s*([\\w\\d]*)\\s*:(.*)`;
const OperationCallExpressionPattern = `(${Expression})\\s?(<=|>=|<>|=|<|>)\\s?(${Expression})`;
const IteratorExpressionPattern = `${AttributePattern}->forAll\\(([\\w\\d]*)\\s*(,\\s*([\\w\\d]*))?\\s*\\|([^)]*)\\)`;
const ImpliesExpressionPattern = `(${OperationCallExpressionPattern})\\simplies\\s(${OperationCallExpressionPattern})`;
const ContextExpressionPattern = `context\\s?(\\w*)`;

export default class OclParser {
    constructor(oclExpression) {
        this.oclExpression = OclParser.trimLeft(oclExpression.replace(/\n/g, ' '));
    }

    parse() {
        let oclExpression = OclParser.trimLeft(this.oclExpression),
            match,
            expr;

        if (match = OclParser.isExpression(ContextExpressionPattern, oclExpression)) {
            expr = new ContextExpression(match[1]);
            expr.inv = this.parseInvariant(oclExpression.slice(match[0].length))
        } else {
            throw new SyntaxError(`Unexpected syntax: '${oclExpression}'`);
        }

        return expr;
    }

    parseInvariant(oclExpression) {
        oclExpression = OclParser.trimLeft(oclExpression);
        let match, expr;

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

    static trimLeft(string) {
        return string.replace(/^\s*/, '').trim();
    }

    static isExpression(regex, expression) {
        return new RegExp(`^${regex}`, 'i').exec(expression);
    }
}
