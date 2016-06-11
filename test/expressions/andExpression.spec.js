const should = require('should');

import {BooleanExpression} from '../../src/components/expressions/booleanExpression'
import {AndExpression} from '../../src/components/expressions/andExpression'

const TRUE = new BooleanExpression(true);
const FALSE = new BooleanExpression(false);

describe('AndExpression', () => {
    it('true && true = true', () => {
        const expr = new AndExpression(TRUE, TRUE);
        expr.evaluate().should.be.ok();
    });

    it('true && false = false', () => {
        const expr = new AndExpression(TRUE, FALSE);
        expr.evaluate().should.not.be.ok();
    });

    it('false && true = false', () => {
        const expr = new AndExpression(FALSE, TRUE);
        expr.evaluate().should.not.be.ok();
    });

    it('false && false = false', () => {
        const expr = new AndExpression(FALSE, FALSE);
        expr.evaluate().should.not.be.ok();
    });
});