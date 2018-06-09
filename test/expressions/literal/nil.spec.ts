import {expect} from "chai";
import {NilExpression} from "../../../lib/components/expressions/literal";

describe('NilExpression', () => {
    it('asdasd', () => {
        let expression = new NilExpression();
        expect(expression.parseValue()).to.be.undefined;
    });
});
