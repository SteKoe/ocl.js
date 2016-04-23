const should = require('should');

import NilExpression from '../../lib/expressions/nilExpression'

describe('NilExpression', () => {
    it('should evaluate to undefined', () => {
        const ne = new NilExpression();
        should(ne.evaluate() === undefined).be.true();
        should(ne.evaluate() === null).be.false();
    });
});