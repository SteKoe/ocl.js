const should = require('should');

import AttributeCallExpression from '../../lib/expressions/attributeCallExpression'
import OrExpression from '../../lib/expressions/orExpression'
import BoolExpression from '../../lib/expressions/booleanExpression'

describe('AttributeCallExpression', () => {
    it('should evaluate self.name', () => {
        const expr = new OrExpression(new BoolExpression('true'), new BoolExpression('true'));
        expr.evaluate().should.be.ok();
    });
});