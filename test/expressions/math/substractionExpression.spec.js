const should = require('should');

import {NumberExpression} from "../../../src/components/expressions/literal/numberExpression";
import {SubstractionExpression} from "../../../src/components/expressions/math/substractionExpression";

const FIVE = new NumberExpression(true);
const TEN = new NumberExpression(false);

describe('SubstractionExpression', () => {
    it('5 - 10 = -10', () => {
        const expr = new SubstractionExpression(FIVE, TEN);
        expr.evaluate().should.eql(-10);
    });

    it('10 - 5 = 5', () => {
        const expr = new SubstractionExpression(TEN, FIVE);
        expr.evaluate().should.eql(5);
    });
});