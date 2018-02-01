import {expect} from "chai";
import {BooleanExpression} from "../../../lib/components/expressions/literal/booleanExpression";
import {AndExpression} from "../../../lib/components/expressions/gate/andExpression";

const TRUE = new BooleanExpression(true);
const FALSE = new BooleanExpression(false);

describe('AndExpression', () => {
    it('true && true = true', () => {
        const expr = new AndExpression(TRUE, TRUE);
        expect(expr.evaluate()).to.be.true;
    });

    it('true && false = false', () => {
        const expr = new AndExpression(TRUE, FALSE);
        expect(expr.evaluate()).to.be.false;
    });

    it('false && true = false', () => {
        const expr = new AndExpression(FALSE, TRUE);
        expect(expr.evaluate()).to.be.false;
    });

    it('false && false = false', () => {
        const expr = new AndExpression(FALSE, FALSE);
        expect(expr.evaluate()).to.be.false;
    });
});