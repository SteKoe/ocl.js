import { expect } from "chai";
import { OperationCallExpression, Operator } from "../../lib/components/expressions/OperationCallExpression";
import { NumberExpression } from "../../lib/components/expressions/literal/NumberExpression";

describe('OperationCallExpression', () => {
    let expression;

    it('<=', () => {
        expression = new OperationCallExpression(Operator.LESS_EQUAL_THAN, new NumberExpression(5), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression(Operator.LESS_EQUAL_THAN, new NumberExpression(22), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('>=', () => {
        expression = new OperationCallExpression(Operator.GREATER_EQUAL_THAN, new NumberExpression(18), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression(Operator.GREATER_EQUAL_THAN, new NumberExpression(17), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('>', () => {
        expression = new OperationCallExpression(Operator.GREATER_THAN, new NumberExpression(19), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression(Operator.GREATER_THAN, new NumberExpression(18), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('<', () => {
        expression = new OperationCallExpression(Operator.LESS_THAN, new NumberExpression(17), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression(Operator.LESS_THAN, new NumberExpression(18), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('<>', () => {
        expression = new OperationCallExpression(Operator.NOT_EQUAL, new NumberExpression(5), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression(Operator.NOT_EQUAL, new NumberExpression(18), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('=', () => {
        expression = new OperationCallExpression(Operator.EQUAL, new NumberExpression(18), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression(Operator.EQUAL, new NumberExpression(5), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('throws error on unknown operation!', () => {
        expression = new OperationCallExpression('===', new NumberExpression(18), new NumberExpression(18));
        (function () {
            expression.evaluate()
        }).should.throw();
    })
});