import {expect} from "chai";

import {StringExpression} from '../../src/components/expressions/literal/stringExpression'
import {LetExpression} from '../../src/components/expressions/letExpression'

describe('LetExpression', () => {
    const stringExpr = new StringExpression("test");

    it('true true', () => {
        const expr = new LetExpression('a', stringExpr);
        var obj = {};
        expr.evaluate(obj);
        expect(obj).to.have.property("a", "test");
    });
});