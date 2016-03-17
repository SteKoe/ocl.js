'use strict';
const should = require('should');

import OclParser from './../lib/oclParser'
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

describe.only('OCLParser', () => {
    const assertAST = (oclExpression, expected) => new OclParser(oclExpression).parse().should.eql(expected);
    const invariantDecorator = definition => {
        return new ContextExpression('Entity', new InvariantExpression(definition));
    };

    it.skip('should parse OCL constraint', () => {
        const oclExpression = `
            context Entity inv:
                c1 <> c2
        `;
        const expected = invariantDecorator(new OperationCallExpression('<>', new VariableExpression('c1'), new VariableExpression('c2')));

        assertAST(oclExpression, expected);
    });

    it('should parse attributeCall expression.', () => {
        const oclExpression = 'context Entity inv: self.participants';
        const expected = invariantDecorator(new AttributeCallExpression('self', 'participants'));

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

    it.skip('should parse IteratorExp two iterators', () => {
        const oclExpression = `
            context Entity inv:
                self.participants->forAll(c1, c2 | c1 <> c2)
        `;

        const attributeCallExpression = new AttributeCallExpression('self','participants');
        const operationCallExpression = new OperationCallExpression('<>', new VariableExpression('c1'), new VariableExpression('c2'));
        const iteratorExpression = new IteratorExpression(attributeCallExpression, ['c1', 'c2'], operationCallExpression);
        const expected = invariantDecorator(iteratorExpression);

        assertAST(oclExpression, expected);
    });

    it.skip('should parse IteratorExp one iterator', () => {
        const oclExpression = `
            context Entity inv:
                self.participants->forAll(c1| c1.name = "Stephan")
        `;

        const attributeCallExpression = new AttributeCallExpression('self','participants');
        const operationCallExpression = new OperationCallExpression('=', new AttributeCallExpression('c1','name'), new StringExpression("Stephan"));
        const iteratorExpression = new IteratorExpression(attributeCallExpression, ['c1'], operationCallExpression);
        const expected = invariantDecorator(iteratorExpression);

        assertAST(oclExpression, expected);
    });

    it.skip('should parse ImpliesExpression', () => {
        const oclExpression = `
            context Entity inv:
                self.a = 1 implies self.b = 2
        `;

        const lefty = new OperationCallExpression('=', new AttributeCallExpression('self','a'), new NumberExpression(1));
        const righty = new OperationCallExpression('=', new AttributeCallExpression('self','b'), new NumberExpression(2));
        const expected = invariantDecorator(new ImpliesExpression(lefty, righty));

        assertAST(oclExpression, expected);
    });

    it.skip('should parse ImpliesExpression with FunctionCallExpression', () => {
        const oclExpression = `
            context Entity
                inv: self.associations->isEmpty() implies self.hasAssociations = 0
        `;
        const lefty = new IsEmptyExpression(new AttributeCallExpression('self', 'associations'));
        const righty = new OperationCallExpression('=', new AttributeCallExpression('self', 'hasAssociations'), new NumberExpression(0));
        const expected = invariantDecorator(new ImpliesExpression(lefty, righty));

        assertAST(oclExpression, expected);
    });

    it('should parse BooleanExpression', () => {
        const oclExpression = `
            context Entity
                inv: self.isIntrinsic = true
        `;

        const expected = invariantDecorator(new OperationCallExpression('=', new AttributeCallExpression('self','isIntrinsic'), new BooleanExpression(true)))

        assertAST(oclExpression, expected);
    })
});