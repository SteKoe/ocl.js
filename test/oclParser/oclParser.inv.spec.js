const should = require('should');

require('../../generator/oclParserGenerator');
import {OclParser} from '../../src/components/parser/oclParser';
import * as Expression from '../../src/components/expressions';

describe('Invariants', () => {
    const assertAST = (oclExpression, expected) => OclParser.parse(oclExpression).should.eql(expected);
    const invariantDecorator = (definition, name) => {
        return new Expression.ContextExpression('Entity', definition ? new Expression.InvariantExpression(definition, name) : {});
    };

    it('should parse OCL constraint', () => {
        const oclExpression = `
            context Entity
                inv: c1 <> c2
        `;

        const varC1 = new Expression.VariableExpression('c1');
        const varC2 = new Expression.VariableExpression('c2');
        const expected = invariantDecorator(new Expression.OperationCallExpression('<>', varC1, varC2));

        assertAST(oclExpression, expected);
    });

    it('should parse StringExpression', () => {
        const oclExpression = `
            context Entity
                inv: "abc"
        `;
        const expected = invariantDecorator(new Expression.StringExpression("abc"));

        assertAST(oclExpression, expected);
    });

    it('should parse attributeCall expression.', () => {
        const oclExpression = 'context Entity inv: self.participants = 0';
        const varSelfParticipants = new Expression.VariableExpression('self.participants');
        const numberExpression = new Expression.NumberExpression(0);
        const expected = invariantDecorator(new Expression.OperationCallExpression("=", varSelfParticipants, numberExpression));

        assertAST(oclExpression, expected);
    });

    it('should parse VariableExp', () => {
        const oclExpression = `
            context Entity
                inv: self
        `;
        const expected = invariantDecorator(new Expression.VariableExpression('self'));

        assertAST(oclExpression, expected);
    });

    it('should parse IteratorExp two iterators', () => {
        const oclExpression = `
            context Entity inv:
                self.participants->forAll(c1,c2 | c1 <> c2)
        `;

        const varC1 = new Expression.VariableExpression('c1');
        const varC2 = new Expression.VariableExpression('c2');
        const operationCallExpression = new Expression.OperationCallExpression('<>', varC1, varC2);
        const attributeCallExpression = new Expression.VariableExpression('self.participants');
        const iteratorExpression = new Expression.IteratorExpression(attributeCallExpression, ['c1', 'c2'], operationCallExpression);
        const expected = invariantDecorator(iteratorExpression);

        assertAST(oclExpression, expected);
    });

    it('should parse IteratorExp one iterator', () => {
        const oclExpression = `
            context Entity inv:
                self.participants->forAll( c1  | c1.name = "Stephan")
        `;

        const attributeCallExpression = new Expression.VariableExpression('self.participants');
        const operationCallExpression = new Expression.OperationCallExpression('=', new Expression.VariableExpression('c1.name'), new Expression.StringExpression("Stephan"));
        const iteratorExpression = new Expression.IteratorExpression(attributeCallExpression, ['c1'], operationCallExpression);
        const expected = invariantDecorator(iteratorExpression);

        assertAST(oclExpression, expected);
    });

    it('should parse IteratorExp one iterator II', () => {
        const oclExpression = `
            context Entity inv:
                self.participants->forAll( c  | c.name = "Stephan")
        `;

        const attributeCallExpression = new Expression.VariableExpression('self.participants');
        const operationCallExpression = new Expression.OperationCallExpression('=', new Expression.VariableExpression('c.name'), new Expression.StringExpression("Stephan"));
        const iteratorExpression = new Expression.IteratorExpression(attributeCallExpression, ['c'], operationCallExpression);
        const expected = invariantDecorator(iteratorExpression);

        assertAST(oclExpression, expected);
    });

    it('should parse ImpliesExpression', () => {
        const oclExpression = `
            context Entity inv:
                self.a = 1 implies self.b = 2
        `;

        const lefty = new Expression.OperationCallExpression('=', new Expression.VariableExpression('self.a'), new Expression.NumberExpression(1));
        const righty = new Expression.OperationCallExpression('=', new Expression.VariableExpression('self.b'), new Expression.NumberExpression(2));
        const expected = invariantDecorator(new Expression.ImpliesExpression(lefty, righty));

        assertAST(oclExpression, expected);
    });

    it('should parse ImpliesExpression II', () => {
        const oclExpression = `
            context Entity inv:
                self.a > 0 implies self.b = 0
       `;

        const lefty = new Expression.OperationCallExpression('>', new Expression.VariableExpression('self.a'), new Expression.NumberExpression(0));
        const righty = new Expression.OperationCallExpression('=', new Expression.VariableExpression('self.b'), new Expression.NumberExpression(0));
        const expected = invariantDecorator(new Expression.ImpliesExpression(lefty, righty));
        assertAST(oclExpression, expected);
    });

    it('should parse ImpliesExpression with FunctionCallExpression', () => {
        const oclExpression = `
            context Entity
                inv: self.associations->isEmpty() implies self.hasAssociations = 0
        `;
        const lefty = new Expression.IsEmptyExpression(new Expression.VariableExpression('self.associations'));
        const righty = new Expression.OperationCallExpression('=', new Expression.VariableExpression('self.hasAssociations'), new Expression.NumberExpression(0));
        const expected = invariantDecorator(new Expression.ImpliesExpression(lefty, righty));

        assertAST(oclExpression, expected);
    });

    it('should parse BooleanExpression', () => {
        const oclExpression = `
            context Entity
                inv: self.isIntrinsic = true
        `;

        const expected = invariantDecorator(new Expression.OperationCallExpression('=', new Expression.VariableExpression('self.isIntrinsic'), new Expression.BooleanExpression(true)))

        assertAST(oclExpression, expected);
    });

    it('should parse AndExpression', () => {
        const oclExpression = `
            context Entity
                inv: self.a = true and self.b = false
        `;

        const andLeft = new Expression.OperationCallExpression('=', new Expression.VariableExpression('self.a'), new Expression.BooleanExpression(true));
        const andRight = new Expression.OperationCallExpression('=', new Expression.VariableExpression('self.b'), new Expression.BooleanExpression(false));
        const expected = invariantDecorator(new Expression.AndExpression(andLeft, andRight));

        assertAST(oclExpression, expected);
    });

    it('should parse OCL constraint with name', () => {
        const oclExpression = `
            context Entity
                inv MyCustomInvariant: c1 <> c2
        `;

        const expected = invariantDecorator(new Expression.OperationCallExpression('<>', new Expression.VariableExpression('c1'), new Expression.VariableExpression('c2')), 'MyCustomInvariant');
        assertAST(oclExpression, expected);
    });

    it('should parse nil expression', () => {
        const oclExpression = `
            context Entity
                inv: c1 <> nil
        `;

        const expected = invariantDecorator(new Expression.OperationCallExpression('<>', new Expression.VariableExpression('c1'), new Expression.NilExpression()));
        assertAST(oclExpression, expected);
    });

    it('should parse SelectExpression', () => {
        const oclExpression = `
            context Entity inv:
                self.children->select(c|c.age < 10)
        `;
        const expected = invariantDecorator(new Expression.SelectExpression(new Expression.VariableExpression("self.children"), ["c"], new Expression.OperationCallExpression("<", new Expression.VariableExpression("c.age"), new Expression.NumberExpression(10))));
        assertAST(oclExpression, expected);
    });

    it('should parse ExistsExpression', () => {
        const oclExpression = `
            context Entity inv:
                self.children->exists(c|c.age < 10)
        `;
        const expected = invariantDecorator(new Expression.ExistsExpression(new Expression.VariableExpression("self.children"), ["c"], new Expression.OperationCallExpression("<", new Expression.VariableExpression("c.age"), new Expression.NumberExpression(10))));
        assertAST(oclExpression, expected);
    });
});