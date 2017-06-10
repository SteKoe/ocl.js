const should = require('should');

import {OrExpression} from '../../src/components/expressions/gate/orExpression'
import {BooleanExpression} from '../../src/components/expressions/literal/booleanExpression'

const TRUE = new BooleanExpression(true);
const FALSE = new BooleanExpression(false);

describe('OrExpression', () => {
    it('TRUE TRUE', () => {
        const expr = new OrExpression(TRUE, TRUE);
        expr.evaluate().should.be.true;
    });

    it('TRUE FALSE', () => {
        const expr = new OrExpression(TRUE, FALSE);
        expr.evaluate().should.be.true;
    });

    it('FALSE TRUE', () => {
        const expr = new OrExpression(FALSE, TRUE);
        expr.evaluate().should.be.true;
    });

    it('FALSE FALSE', () => {
        const expr = new OrExpression(TRUE, TRUE);
        expr.evaluate().should.be.false;
    });
});