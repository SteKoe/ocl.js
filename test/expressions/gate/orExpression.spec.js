import { expect } from "chai";
import { OrExpression } from "../../../lib/components/expressions/gate/OrExpression";
import { BooleanExpression } from "../../../lib/components/expressions/literal/BooleanExpression";

const TRUE = new BooleanExpression(true);
const FALSE = new BooleanExpression(false);

describe('OrExpression', () => {
    it('TRUE or TRUE', () => {
        const expr = new OrExpression(TRUE, TRUE);
        expect(expr.evaluate()).to.be.true;
    });

    it('TRUE or FALSE', () => {
        const expr = new OrExpression(TRUE, FALSE);
        expect(expr.evaluate()).to.be.true;
    });

    it('FALSE or TRUE', () => {
        const expr = new OrExpression(FALSE, TRUE);
        expect(expr.evaluate()).to.be.true;
    });

    it('FALSE or FALSE', () => {
        const expr = new OrExpression(FALSE, FALSE);
        expect(expr.evaluate()).to.be.false;
    });
});