import { expect } from "chai";
import { VariableExpression } from '../../../lib/components/expressions/VariableExpression'
import { CollectExpression } from '../../../lib/components/expressions/collection/CollectExpression'

describe('CollectExpression', () => {
    const self = {
        children: [
            { name: 'A' },
            { name: 'B' },
            { name: 'C' }
        ]
    };

    it('works for properties', () => {
        const source = new VariableExpression('self.children');
        const expression = new VariableExpression('child.name');
        const expr = new CollectExpression(source, 'child', expression);
        expect(expr.evaluate(self)).to.eql(['A', 'B', 'C']);
    });
});