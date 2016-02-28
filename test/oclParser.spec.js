'use strict';
const should = require('should');
import OclParser from './../lib/oclParser'

describe('OCLParser', () => {
    const assertAST = (oclExpression, expected) => new OclParser(oclExpression).parse().should.eql(expected);
    const invariantDecorator = definition => {
        return {
            name: 'ContextExpression',
            targetType: 'Entity',
            inv: {
                name: "InvariantExpression",
                definition: definition
            }
        };
    };

    it('should parse context', () => {
        const oclExpression = 'context Entity';
        const expected = {
            name: 'ContextExpression',
            targetType: 'Entity',
            inv: {}
        };

        assertAST(oclExpression, expected);
    });

    it('should parse OCL constraint', () => {
        const oclExpression = `
            context Entity inv:
                c1 <> c2
        `;

        const expected = invariantDecorator({
            name: "OperationCallExpression",
            operator: "<>",
            left: {
                name: "VariableExpression",
                variable: "c1"
            },
            right: {
                name: "VariableExpression",
                variable: "c2"
            }
        });

        assertAST(oclExpression, expected);
    });

    it('should parse attributeCall expression.', () => {
        const oclExpression = 'context Entity inv: self.participants';
        const expected = invariantDecorator({
            name: 'AttributeCallExpression',
            variable: 'self',
            attributes: ['participants']
        });

        assertAST(oclExpression, expected);
    });

    it('should parse VariableExp', () => {
        const oclExpression = 'context Entity inv: self';
        const expected = invariantDecorator({
            name: 'VariableExpression',
            variable: 'self'
        });

        assertAST(oclExpression, expected);
    });

    it('should parse IteratorExp two iterators', () => {
        const expected = invariantDecorator({
            name: 'IteratorExpression',
            source: {
                name: 'AttributeCallExpression',
                variable: 'self',
                attributes: ['participants']
            },
            iterators: ['c1', 'c2'],
            body: {
                name: "OperationCallExpression",
                operator: "<>",
                left: {
                    name: "VariableExpression",
                    variable: "c1"
                },
                right: {
                    name: "VariableExpression",
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
            name: 'IteratorExpression',
            source: {
                name: 'AttributeCallExpression',
                variable: 'self',
                attributes: ['participants']
            },
            iterators: ['c1'],
            body: {
                name: "OperationCallExpression",
                operator: "<>",
                left: {
                    name: "VariableExpression",
                    variable: "c1"
                },
                right: {
                    name: "VariableExpression",
                    variable: "c2"
                }
            }
        });
        const oclExpression = `
            context Entity inv:
                self.participants->forAll(c1| c1 <> c2)
        `;

        assertAST(oclExpression, expected);
    });

    it('should parse ImpliesExpression', () => {
        const oclExpression = `
            context Entity inv:
                self.a = 1 implies self.b = 2
        `;

        const expected = invariantDecorator({
            name: 'ImpliesExpression',
            left: {
                name: "OperationCallExpression",
                operator: "=",
                left: {
                    name: 'AttributeCallExpression',
                    variable: 'self',
                    attributes: ['a']
                },
                right: {
                    name: "NumberExpression",
                    value: 1
                }
            }
            ,
            right: {
                name: "OperationCallExpression",
                operator: "=",
                left: {
                    name: 'AttributeCallExpression',
                    variable: 'self',
                    attributes: ['b']
                },
                right: {
                    name: "NumberExpression",
                    value: 2
                }
            }
        });

        assertAST(oclExpression, expected);
    });

});