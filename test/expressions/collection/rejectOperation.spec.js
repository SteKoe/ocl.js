import { expect } from "chai";
import { RejectExpression } from '../../../lib/components/expressions/collection/RejectExpression'
import { NumberExpression } from '../../../lib/components/expressions/literal/NumberExpression'
import { OperationCallExpression } from '../../../lib/components/expressions/OperationCallExpression'
import { VariableExpression } from '../../../lib/components/expressions/VariableExpression'

describe('RejectExpression', () => {
    const self = {
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        children: [
            { name: 'A', age: 12 },
            { name: 'B', age: 21 }
        ]
    };

    it('works for simple numbers', () => {
        const source = new VariableExpression('self.numbers');
        const expression = new OperationCallExpression('>', new VariableExpression('a'), new NumberExpression(4));
        const expr = new RejectExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.eql([1, 2, 3, 4]);
    });

    it('works for object properties', () => {
        const source = new VariableExpression('self.children');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(18));
        const expr = new RejectExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.eql([self.children[0]]);
    });
});