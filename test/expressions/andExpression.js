const should = require('should');

import BooleanExpression from '../../lib/parser/expressions/booleanExpression'
import AndExpression from '../../lib/parser/expressions/andExpression'

const TRUE = new BooleanExpression(true);
const FALSE = new BooleanExpression(false);

describe('AndExpression', () => {
    it('true true', () => {
        const expr = new AndExpression(TRUE, TRUE);
        expr.evaluate().should.be.ok();
    });

    it('true false', () => {
        const expr = new AndExpression(TRUE, FALSE);
        expr.evaluate().should.not.be.ok();
    });

    it('false true', () => {
        const expr = new AndExpression(FALSE, TRUE);
        expr.evaluate().should.not.be.ok();
    });

    it('false false', () => {
        const expr = new AndExpression(FALSE, FALSE);
        expr.evaluate().should.not.be.ok();
    });
});