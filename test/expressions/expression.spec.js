import {expect} from "chai";
import {Expression} from "../../src/components/expressions/expression";

describe('Expression', () => {
    it('should throw', () => {
        const expr = new Expression();
        expect(() => expr.evaluate()).to.throw();
    });
});