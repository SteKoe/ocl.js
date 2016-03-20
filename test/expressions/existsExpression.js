const should = require('should');

import ExistsExpression from '../../lib/expressions/existsExpression'
import OperationCallExpression from '../../lib/expressions/operationCallExpression'
import VariableExpression from '../../lib/expressions/variableExpression'
import NumberExpression from '../../lib/expressions/numberExpression'

describe('ExistsExpression', () => {
    const self = {
        collection: [
            {age: 1},
            {age: 2},
            {age: 4},
            {age: 8},
            {age: 16}
        ]
    };

    it('should be true', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(10));
        var expr = new ExistsExpression(source, 'a', expression);
        expr.evaluate(self).should.be.true();
    });

    it('should be false', () => {
        const source = new VariableExpression('self.collection');
        const expression = new OperationCallExpression('>', new VariableExpression('a.age'), new NumberExpression(18));
        var expr = new ExistsExpression(source, 'a', expression);
        expr.evaluate(self).should.be.false();
    });

});