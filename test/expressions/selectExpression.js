const should = require('should');

import SelectExpression from '../../lib/expressions/selectExpression'
import OperationCallExpression from '../../lib/expressions/operationCallExpression'
import VariableExpression from '../../lib/expressions/variableExpression'
import NumberExpression from '../../lib/expressions/numberExpression'

describe('SelectExpression', () => {
    it('true true', () => {
        const self = {
            collection: [
                {age: 1},
                {age: 2},
                {age: 4},
                {age: 8},
                {age: 16}
            ]
        };

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
});