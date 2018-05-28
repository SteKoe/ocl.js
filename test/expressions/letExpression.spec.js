import {expect} from "chai";
import {StringExpression} from "../../lib/components/expressions/literal/StringExpression";
import {LetExpression} from "../../lib/components/expressions/LetExpression";

describe('LetExpression', () => {
    const stringExpr = new StringExpression("test");

    it('true true', () => {
        const expr = new LetExpression('a', stringExpr);
        var obj = {};
        expr.evaluate(obj);
        expect(obj).to.have.property("a", "test");
    });
});