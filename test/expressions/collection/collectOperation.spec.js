import { expect } from "chai";
import { VariableExpression } from '../../../lib/components/expressions/VariableExpression'
import { CollectOperation } from '../../../lib/components/expressions/collection/CollectOperation'

describe('CollectOperation', () => {
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
        const expr = new CollectOperation(source, 'child', expression);
        expect(expr.evaluate(self)).to.eql(['A', 'B', 'C']);
    });
});