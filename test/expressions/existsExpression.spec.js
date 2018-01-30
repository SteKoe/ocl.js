import {expect} from "chai";
import {ExistsExpression} from "../../src/components/expressions/existsExpression";
import {OperationCallExpression} from "../../src/components/expressions/operationCallExpression";
import {VariableExpression} from "../../src/components/expressions/variableExpression";
import {NumberExpression} from "../../src/components/expressions/literal/numberExpression";
import {StringExpression} from "../../src/components/expressions/literal/stringExpression";

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