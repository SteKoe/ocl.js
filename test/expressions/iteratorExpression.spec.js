import {expect} from "chai";
import {IteratorExpression} from "../../lib/components/expressions/iteratorExpression";
import {OperationCallExpression} from "../../lib/components/expressions/operationCallExpression";
import {VariableExpression} from "../../lib/components/expressions/variableExpression";
import {NumberExpression} from "../../lib/components/expressions/literal/numberExpression";

describe('IteratorExpression', () => {
    const self = {
        collection: [
            {age: 1},
            {age: 2},
            {age: 4},
            {age: 8},
            {age: 16}
        ]
    };

    it('one iterator: should be true', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(0));
        var expr = new IteratorExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.be.true;
    });

    it('one iterator: should be false', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(18));
        var expr = new IteratorExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.be.false;
    });

    it('should return false when source is undefined', () => {
        const source = new VariableExpression('self.a');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(18));
        var expr = new IteratorExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.be.false;
    });
});