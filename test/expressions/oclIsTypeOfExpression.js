const should = require('should');

import OclIsTypeOfExpression from '../../lib/parser/expressions/oclIsTypeOfExpression'

class Animal {}
class Human extends Animal {}
class God {}

describe('OclIsKindOfExpression', () => {
    it('should evaluate truthy.', () => {
        const ne = new OclIsTypeOfExpression(new Human(), Human);
        ne.evaluate().should.be.true();
    });

    it('should evaluate true for super class.', () => {
        const ne = new OclIsTypeOfExpression(new Human(), Animal);
        ne.evaluate().should.be.false();
    });

    it('should evaluate false for unassociated class.', () => {
        const ne = new OclIsTypeOfExpression(new Human(), God);
        ne.evaluate().should.be.false();
    });
});