import { expect } from "chai";
import { NotExpression } from '../../lib/components/expressions/NotExpression'
import { BooleanExpression } from '../../lib/components/expressions/literal'
import { VariableExpression } from '../../lib/components/expressions'

describe('NotExpression', () => {
    it('not true => false', () => {
        const expression = new NotExpression(new BooleanExpression(true));
        expect(expression.evaluate()).to.be.false;
    });

    it('not false => true', () => {
        const expression = new NotExpression(new BooleanExpression(false));
        expect(expression.evaluate()).to.be.true;
    });

    it('not true of obj => false', () => {
        const expression = new NotExpression(new VariableExpression("self.isPaid"));
        expect(expression.evaluate({ isPaid: true })).to.be.false;
    });

    it('not false of obj => true', () => {
        const expression = new NotExpression(new VariableExpression("self.isPaid"));
        expect(expression.evaluate({ isPaid: false })).to.be.true;
    });
});