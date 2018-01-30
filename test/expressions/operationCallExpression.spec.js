import {expect} from "chai";

import {OperationCallExpression} from "../../src/components/expressions/operationCallExpression";
import {NumberExpression} from "../../src/components/expressions/literal/numberExpression";

describe('OperationCallExpression', () => {
    let expression;

    it('<=', () => {
        expression = new OperationCallExpression('<=', new NumberExpression(5), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression('<=', new NumberExpression(22), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('>=', () => {
        expression = new OperationCallExpression('>=', new NumberExpression(18), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression('>=', new NumberExpression(17), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('>', () => {
        expression = new OperationCallExpression('>', new NumberExpression(19), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression('>', new NumberExpression(18), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('<', () => {
        expression = new OperationCallExpression('<', new NumberExpression(17), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression('<', new NumberExpression(18), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('<>', () => {
        expression = new OperationCallExpression('<>', new NumberExpression(5), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression('<>', new NumberExpression(18), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('=', () => {
        expression = new OperationCallExpression('=', new NumberExpression(18), new NumberExpression(18));
        expect(expression.evaluate()).should.be.true;

        expression = new OperationCallExpression('=', new NumberExpression(5), new NumberExpression(18));
        expect(expression.evaluate()).should.be.false;
    });

    it('throws error on unknown operation!', () => {
        expression = new OperationCallExpression('===', new NumberExpression(18), new NumberExpression(18));
        (function() {expression.evaluate()}).should.throw();
    })
});