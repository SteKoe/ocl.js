const should = require('should');

import {StringExpression} from '../../src/components/expressions/literal/stringExpression'
import {LetExpression} from '../../src/components/expressions/letExpression'

describe('LetExpression', () => {
    const stringExpr = new StringExpression("test");

    it('true true', () => {
        const expr = new LetExpression('a', stringExpr);
        var obj = {};
        expr.evaluate(obj);
        obj.should.have.property("a", "test");
    });
});