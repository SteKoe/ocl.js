import {expect} from "chai";
import {ExistsExpression} from "../../lib/components/expressions/existsExpression";
import {OperationCallExpression} from "../../lib/components/expressions/operationCallExpression";
import {VariableExpression} from "../../lib/components/expressions/variableExpression";
import {NumberExpression} from "../../lib/components/expressions/literal/numberExpression";
import {StringExpression} from "../../lib/components/expressions/literal/stringExpression";

describe('ExistsExpression', () => {
    const self = {
        collection: [
            {age: 1},
            {age: 2},
            {age: 4},
            {age: 8},
            {age: 16}
        ],
        children: [
            {name: 'A'},
            {name: 'B'}
        ]
    };

    it('should be true', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(10));
        var expr = new ExistsExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.be.true;
    });

    it('should be false', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(18));
        var expr = new ExistsExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.be.false;
    });

    it('should return false when source is undefined', () => {
        const source = new VariableExpression('self.a');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(18));
        var expr = new ExistsExpression(source, 'a', expression);
        expect(expr.evaluate(self)).to.be.false;
    });

    it('should return true for string', () => {
        const source = new VariableExpression('self.children');
        const expression = new OperationCallExpression('>', new VariableExpression('c.name'), new StringExpression("A"));
        var expr = new ExistsExpression(source, 'c', expression);
        expect(expr.evaluate(self)).to.be.true;
    });
});