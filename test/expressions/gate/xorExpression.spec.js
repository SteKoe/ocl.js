import { expect } from "chai";
import { BooleanExpression, XorExpression } from "../../../lib/components/expressions";

const TRUE = new BooleanExpression(true);
const FALSE = new BooleanExpression(false);

describe('XorExpression', () => {
    it('true xor true', () => {
        const expr = new XorExpression(TRUE, TRUE);
        expect(expr.evaluate()).to.be.false;
    });

    it('true xor false', () => {
        const expr = new XorExpression(TRUE, FALSE);
        expect(expr.evaluate()).to.be.true;
    });

    it('false xor true', () => {
        const expr = new XorExpression(FALSE, TRUE);
        expect(expr.evaluate()).to.be.true;
    });

    it('false xor false', () => {
        const expr = new XorExpression(FALSE, FALSE);
        expect(expr.evaluate()).to.be.false;
    });
});