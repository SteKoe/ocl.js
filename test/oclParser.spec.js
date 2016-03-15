'use strict';
const should = require('should');

import OclParser from './../lib/oclParser'
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

describe('OCLParser', () => {
    const assertAST = (oclExpression, expected) => new OclParser(oclExpression).parse().should.eql(expected);
    const invariantDecorator = definition => {
        return new ContextExpression('Entity', new InvariantExpression(definition));
    };

    it('should parse context', () => {
        const oclExpression = 'context Entity';
        const expected = new ContextExpression('Entity');
        assertAST(oclExpression, expected);
    });

    it('should parse OCL constraint', () => {
        const oclExpression = `
            context Entity inv:
                c1 <> c2
        `;

        const expected = invariantDecorator({
            type: "OperationCallExpression",
            operator: "<>",
            left: {
                type: "VariableExpression",
                variable: "c1"
            },
            right: {
                type: "VariableExpression",
                variable: "c2"
            }
        });

        assertAST(oclExpression, expected);
    });

    it('should parse attributeCall expression.', () => {
        const oclExpression = 'context Entity inv: self.participants';
        const expected = invariantDecorator({
            type: 'AttributeCallExpression',
            variable: 'self',
            attributes: ['participants']
        });

        assertAST(oclExpression, expected);
    });

    it('should parse VariableExp', () => {
        const oclExpression = 'context Entity inv: self';
        const expected = invariantDecorator({
            type: 'VariableExpression',
            variable: 'self'
        });

        assertAST(oclExpression, expected);
    });

    it('should parse IteratorExp two iterators', () => {
        const expected = invariantDecorator({
            type: 'IteratorExpression',
            source: {
                type: 'AttributeCallExpression',
                variable: 'self',
                attributes: ['participants']
            },
            iterators: ['c1', 'c2'],
            body: {
                type: "OperationCallExpression",
                operator: "<>",
                left: {
                    type: "VariableExpression",
                    variable: "c1"
                },
                right: {
                    type: "VariableExpression",
                    variable: "c2"
                }
            }
        });
        const oclExpression = `
            context Entity inv:
                self.participants->forAll(c1, c2 | c1 <> c2)
        `;

        assertAST(oclExpression, expected);
    });

    it('should parse IteratorExp one iterator', () => {
        const expected = invariantDecorator({
            type: 'IteratorExpression',
            source: {
                type: 'AttributeCallExpression',
                variable: 'self',
                attributes: ['participants']
            },
            iterators: ['c1'],
            body: {
                type: "OperationCallExpression",
                operator: "<>",
                left: {
                    type: "VariableExpression",
                    variable: "c1"
                },
                right: {
                    type: "VariableExpression",
                    variable: "c2"
                }
            }
        });
        const oclExpression = `
            context Entity inv:
                self.participants->forAll(c1,c2| c1.name <> c2.name)
        `;

        assertAST(oclExpression, expected);
    });

    it('should parse ImpliesExpression', () => {
        const oclExpression = `
            context Entity inv:
                self.a = 1 implies self.b = 2
        `;

        const expected = invariantDecorator({
            type: 'ImpliesExpression',
            left: {
                type: "OperationCallExpression",
                operator: "=",
                left: {
                    type: 'AttributeCallExpression',
                    variable: 'self',
                    attributes: ['a']
                },
                right: {
                    type: "NumberExpression",
                    value: 1
                }
            }
            ,
            right: {
                type: "OperationCallExpression",
                operator: "=",
                left: {
                    type: 'AttributeCallExpression',
                    variable: 'self',
                    attributes: ['b']
                },
                right: {
                    type: "NumberExpression",
                    value: 2
                }
            }
        });

        assertAST(oclExpression, expected);
    });

    it.skip('asdf', () => {
        const oclExpression = `
            context Entity
                inv: self.associations->isEmpty() implies self.hasAssociations = 0
        `;
        const lefty = new IsEmptyExpression(new AttributeCallExpression('self', 'associations'));
        const righty = new OperationCallExpression('=', new AttributeCallExpression('self', 'hasAssociations'), 0);
        const expected = invariantDecorator(new ImpliesExpression(lefty, righty));

        assertAST(oclExpression, expected);
    });
});