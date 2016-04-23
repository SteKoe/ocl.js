const should = require('should');

import OrExpression from '../../lib/expressions/orExpression'
import BoolExpression from '../../lib/expressions/booleanExpression'

const TRUE = new BoolExpression(true);
const FALSE = new BoolExpression(false);

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