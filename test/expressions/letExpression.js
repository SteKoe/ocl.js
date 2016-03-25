const should = require('should');

import StringExpression from '../../lib/expressions/stringExpression'
import LetExpression from '../../lib/expressions/letExpression'

describe('LetExpression', () => {

    var stringExpr = new StringExpression("test");

    it('true true', () => {
        const expr = new LetExpression('a', stringExpr);
        var obj = {};
        expr.evaluate(obj);
        obj.should.have.property("a", "test");
    });
});