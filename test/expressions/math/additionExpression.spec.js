import {expect} from "chai";
import {NumberExpression} from "../../../src/components/expressions/literal/numberExpression";
import {AdditionExpression} from "../../../src/components/expressions/math/additionExpression";

const FIVE = new NumberExpression(5);
const TEN = new NumberExpression(10);

describe('AdditionExpression', () => {
    it('5 + 10 = 15', () => {
        const expr = new AdditionExpression(FIVE, TEN);
        expect(expr.evaluate()).to.equal(15);
    });
});