import OclParserGenerator from '../../lib/parser/oclParserGenerator'

import ContextExpression from '../../lib/parser/expressions/contextExpression';
import AndExpression from '../../lib/parser/expressions/andExpression';
import ImpliesExpression from '../../lib/parser/expressions/impliesExpression';
import InvariantExpression from '../../lib/parser/expressions/invariantExpression';
import IsEmptyExpression from '../../lib/parser/expressions/isEmptyExpression';
import IteratorExpression from '../../lib/parser/expressions/iteratorExpression';
import SelectExpression from '../../lib/parser/expressions/selectExpression';
import ExistsExpression from '../../lib/parser/expressions/existsExpression';
import NumberExpression from '../../lib/parser/expressions/numberExpression';
import OperationCallExpression from '../../lib/parser/expressions/operationCallExpression';
import StringExpression from '../../lib/parser/expressions/stringExpression';
import BooleanExpression from '../../lib/parser/expressions/booleanExpression';
import VariableExpression from '../../lib/parser/expressions/variableExpression';
import NilExpression from '../../lib/parser/expressions/nilExpression';

const should = require('should');

describe('Invariants', () => {
    let OclParser;
    const assertAST = (oclExpression, expected) => OclParser.parse(oclExpression).should.eql(expected);
    const invariantDecorator = (definition, name) => {
        return new ContextExpression('Entity', definition ? new InvariantExpression(definition, name) : {});
    };

    before(() => {
        OclParserGenerator.generate();
        OclParser = require('./../../lib/parser/oclParser').default;
    });

    it('should parse OCL constraint', () => {
        const oclExpression = `
            context Entity
                inv: c1 <> c2
        `;
        const expected = invariantDecorator(new OperationCallExpression('<>', new VariableExpression('c1'), new VariableExpression('c2')));

        assertAST(oclExpression, expected);
    });

    it('should parse StringExpression', () => {
        const oclExpression = `
            context Entity
                inv: "abc"
        `;
        const expected = invariantDecorator(new StringExpression("abc"));

        assertAST(oclExpression, expected);
    });

    it('should parse attributeCall expression.', () => {
        const oclExpression = 'context Entity inv: self.participants = 0';
        const expected = invariantDecorator(new OperationCallExpression("=", new VariableExpression('self.participants'), new NumberExpression(0)));

        assertAST(oclExpression, expected);
    });

    it('should parse VariableExp', () => {
        const oclExpression = `
            context Entity
                inv: self
        `;
        const expected = invariantDecorator({
            type: 'VariableExpression',
            variable: 'self'
        });

        assertAST(oclExpression, expected);
    });

    it('should parse IteratorExp two iterators', () => {
        const oclExpression = `
            context Entity inv:
                self.participants->forAll(c1,c2 | c1 <> c2)
        `;

        const attributeCallExpression = new VariableExpression('self.participants');
        const operationCallExpression = new OperationCallExpression('<>', new VariableExpression('c1'), new VariableExpression('c2'));
        const iteratorExpression = new IteratorExpression(attributeCallExpression, ['c1', 'c2'], operationCallExpression);
        const expected = invariantDecorator(iteratorExpression);

        assertAST(oclExpression, expected);
    });

    it('should parse IteratorExp one iterator', () => {
        const oclExpression = `
            context Entity inv:
                self.participants->forAll( c1  | c1.name = "Stephan")
        `;

        const attributeCallExpression = new VariableExpression('self.participants');
        const operationCallExpression = new OperationCallExpression('=', new VariableExpression('c1.name'), new StringExpression("Stephan"));
        const iteratorExpression = new IteratorExpression(attributeCallExpression, ['c1'], operationCallExpression);
        const expected = invariantDecorator(iteratorExpression);

        assertAST(oclExpression, expected);
    });

    it('should parse IteratorExp one iterator II', () => {
        const oclExpression = `
            context Entity inv:
                self.participants->forAll( c  | c.name = "Stephan")
        `;

        const attributeCallExpression = new VariableExpression('self.participants');
        const operationCallExpression = new OperationCallExpression('=', new VariableExpression('c.name'), new StringExpression("Stephan"));
        const iteratorExpression = new IteratorExpression(attributeCallExpression, ['c'], operationCallExpression);
        const expected = invariantDecorator(iteratorExpression);

        assertAST(oclExpression, expected);
    });

    it('should parse ImpliesExpression', () => {
        const oclExpression = `
            context Entity inv:
                self.a = 1 implies self.b = 2
        `;

        const lefty = new OperationCallExpression('=', new VariableExpression('self.a'), new NumberExpression(1));
        const righty = new OperationCallExpression('=', new VariableExpression('self.b'), new NumberExpression(2));
        const expected = invariantDecorator(new ImpliesExpression(lefty, righty));

        assertAST(oclExpression, expected);
    });

    it('should parse ImpliesExpression II', () => {
        const oclExpression = `
            context Entity inv:
                self.a > 0 implies self.b = 0
       `;

        const lefty = new OperationCallExpression('>', new VariableExpression('self.a'), new NumberExpression(0));
        const righty = new OperationCallExpression('=', new VariableExpression('self.b'), new NumberExpression(0));
        const expected = invariantDecorator(new ImpliesExpression(lefty, righty));
        assertAST(oclExpression, expected);
    });

    it('should parse ImpliesExpression with FunctionCallExpression', () => {
        const oclExpression = `
            context Entity
                inv: self.associations->isEmpty() implies self.hasAssociations = 0
        `;
        const lefty = new IsEmptyExpression(new VariableExpression('self.associations'));
        const righty = new OperationCallExpression('=', new VariableExpression('self.hasAssociations'), new NumberExpression(0));
        const expected = invariantDecorator(new ImpliesExpression(lefty, righty));

        assertAST(oclExpression, expected);
    });

    it('should parse BooleanExpression', () => {
        const oclExpression = `
            context Entity
                inv: self.isIntrinsic = true
        `;

        const expected = invariantDecorator(new OperationCallExpression('=', new VariableExpression('self.isIntrinsic'), new BooleanExpression(true)))

        assertAST(oclExpression, expected);
    });

    it('should parse AndExpression', () => {
        const oclExpression = `
            context Entity
                inv: self.a = true and self.b = false
        `;

        const andLeft = new OperationCallExpression('=', new VariableExpression('self.a'), new BooleanExpression(true));
        const andRight = new OperationCallExpression('=', new VariableExpression('self.b'), new BooleanExpression(false));
        new AndExpression(andLeft, andRight);
        const expected = invariantDecorator(new AndExpression(andLeft, andRight));

        assertAST(oclExpression, expected);
    });

    it('should parse OCL constraint with name', () => {
        const oclExpression = `
            context Entity
                inv MyCustomInvariant: c1 <> c2
        `;

        const expected = invariantDecorator(new OperationCallExpression('<>', new VariableExpression('c1'), new VariableExpression('c2')), 'MyCustomInvariant');
        assertAST(oclExpression, expected);
    });

    it('should parse nil expression', () => {
        const oclExpression = `
            context Entity
                inv: c1 <> nil
        `;

        const expected = invariantDecorator(new OperationCallExpression('<>', new VariableExpression('c1'), new NilExpression()));
        assertAST(oclExpression, expected);
    });

    it('should parse SelectExpression', () => {
        const oclExpression = `
            context Entity inv:
                self.children->select(c|c.age < 10)
        `;
        const expected = invariantDecorator(new SelectExpression(new VariableExpression("self.children"), ["c"], new OperationCallExpression("<", new VariableExpression("c.age"), new NumberExpression(10))));
        assertAST(oclExpression, expected);
    });

    it('should parse ExistsExpression', () => {
        const oclExpression = `
            context Entity inv:
                self.children->exists(c|c.age < 10)
        `;
        const expected = invariantDecorator(new ExistsExpression(new VariableExpression("self.children"), ["c"], new OperationCallExpression("<", new VariableExpression("c.age"), new NumberExpression(10))));
        assertAST(oclExpression, expected);
    });
});