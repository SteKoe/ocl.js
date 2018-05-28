import {expect} from "chai";
import {NumberExpression} from "../../../lib/components/expressions/literal/NumberExpression";
import {AdditionExpression} from "../../../lib/components/expressions/math/AdditionExpression";

const FIVE = new NumberExpression(5);
const TEN = new NumberExpression(10);
const MINUS_TEN = new NumberExpression(-10);

describe('AdditionExpression', () => {
    it('5 + 10 = 15', () => {
        const expr = new AdditionExpression(FIVE, TEN);
        expect(expr.evaluate()).to.equal(15);
    });

    it('5 +- 10 = -5', () => {
        const expr = new AdditionExpression(FIVE, MINUS_TEN);
        expect(expr.evaluate()).to.equal(-5);
    });
});