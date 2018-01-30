import {expect} from "chai";

import {OrExpression} from '../../src/components/expressions/gate/orExpression'
import {BooleanExpression} from '../../src/components/expressions/literal/booleanExpression'

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