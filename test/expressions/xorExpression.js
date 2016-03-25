const should = require('should');

import BooleanExpression from '../../lib/expressions/booleanExpression'
import XorExpression from '../../lib/expressions/xorExpression'

const TRUE = new BooleanExpression(true);
const FALSE = new BooleanExpression(false);

describe('XorExpression', () => {
    it('true true', () => {
        const expr = new XorExpression(TRUE, TRUE);
        expr.evaluate().should.be.false();
    });

    it('true false', () => {
        const expr = new XorExpression(TRUE, FALSE);
        expr.evaluate().should.be.true();
    });

    it('false true', () => {
        const expr = new XorExpression(FALSE, TRUE);
        expr.evaluate().should.be.true();
    });

    it('false false', () => {
        const expr = new XorExpression(FALSE, FALSE);
        expr.evaluate().should.be.false();
    });
});