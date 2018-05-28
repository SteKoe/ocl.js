import {expect} from "chai";
import {Expression} from "../../lib/components/expressions/Expression";

describe('Expression', () => {
    it('should throw', () => {
        const expr = new Expression();
        expect(() => expr.evaluate()).to.not.throw();
    });
});