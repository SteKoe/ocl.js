const should = require('should');

import NilExpression from '../../lib/expressions/nilExpression'

describe('NilExpression', () => {
    it('should evaluate self.name', () => {
        const ne = new NilExpression();
        should(ne.evaluate() === undefined).should.be.true;
        should(ne.evaluate() === null).should.be.true;
    });
});