import { expect } from "chai";
import { NumberExpression } from "../../../lib/components/expressions/literal/NumberExpression";
import { SubstractionExpression } from "../../../lib/components/expressions/math/SubstractionExpression";

const FIVE = new NumberExpression(5);
const TEN = new NumberExpression(10);

describe('SubstractionExpression', () => {
    it('5 - 10 = -5', () => {
        const expr = new SubstractionExpression(FIVE, TEN);
        expect(expr.evaluate()).to.equal(-5);
    });

    it('10 - 5 = 5', () => {
        const expr = new SubstractionExpression(TEN, FIVE);
        expect(expr.evaluate()).to.equal(5);
    });
});