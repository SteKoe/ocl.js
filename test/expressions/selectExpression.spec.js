import { expect } from "chai";
import { SelectExpression } from "../../lib/components/expressions/SelectExpression";
import { OperationCallExpression } from "../../lib/components/expressions/OperationCallExpression";
import { VariableExpression } from "../../lib/components/expressions/VariableExpression";
import { NumberExpression } from "../../lib/components/expressions/literal/NumberExpression";

describe('SelectExpression', () => {
    const self = {
        collection: [
            { age: 1 },
            { age: 2 },
            { age: 4 },
            { age: 8 },
            { age: 16 }
        ]
    };

    it('positive test WITH variable.', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('<', new VariableExpression('a.age'), new NumberExpression(10));
        var expr = new SelectExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.eql([
            { age: 1 },
            { age: 2 },
            { age: 4 },
            { age: 8 }
        ]);
    });

    it('negative test WITH variable.', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(18));
        var expr = new SelectExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.eql([]);
    });

    it('to return empty array, if source is undefined or not collection.', () => {
        const source = new VariableExpression('self.a');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(18));
        var expr = new SelectExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.eql([]);
    });

    it('positive test WITHOUT variable.', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('<', new VariableExpression('age'), new NumberExpression(10));
        var expr = new SelectExpression(source, null, expression);
        expect(expr.evaluate(self)).to.eql([
            { age: 1 },
            { age: 2 },
            { age: 4 },
            { age: 8 }
        ]);
    });

    it('negative test WITHOUT variable.', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('>', new VariableExpression('age'), new NumberExpression(18));
        var expr = new SelectExpression(source, null, expression);
        expect(expr.evaluate(self)).to.eql([]);
    });
});