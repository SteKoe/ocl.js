const should = require('should');

import SelectExpression from '../../lib/parser/expressions/selectExpression'
import OperationCallExpression from '../../lib/parser/expressions/operationCallExpression'
import VariableExpression from '../../lib/parser/expressions/variableExpression'
import NumberExpression from '../../lib/parser/expressions/numberExpression'

describe('SelectExpression', () => {
    const self = {
        collection: [
            {age: 1},
            {age: 2},
            {age: 4},
            {age: 8},
            {age: 16}
        ]
    };

    it('positive test.', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('<', new VariableExpression('a.age'), new NumberExpression(10));
        var expr = new SelectExpression(source, 'a', expression);
        expr.evaluate(self).should.eql([
            {age: 1},
            {age: 2},
            {age: 4},
            {age: 8}
        ]);
    });

    it('negative test.', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(18));
        var expr = new SelectExpression(source, 'a', expression);
        expr.evaluate(self).should.eql([]);
    });

    it('should return empty array, if source is undefined or not collection.', () => {
        const source = new VariableExpression('self.a');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(18));
        var expr = new SelectExpression(source, 'a', expression);
        expr.evaluate(self).should.eql([]);
    });
});