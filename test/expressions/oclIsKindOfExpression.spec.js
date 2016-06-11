const should = require('should');

import {OclIsKindOfExpression} from '../../src/components/expressions/oclIsKindOfExpression'

class Animal {}
class Human extends Animal {}
class God {}

describe('OclIsKindOfExpression', () => {
    it('should evaluate truthy.', () => {
        const ne = new OclIsKindOfExpression(new Human(), Human);
        ne.evaluate().should.be.true();
    });

    it('should evaluate true for super class.', () => {
        const ne = new OclIsKindOfExpression(new Human(), Animal);
        ne.evaluate().should.be.true();
    });

    it('should evaluate false for unassociated class.', () => {
        const ne = new OclIsKindOfExpression(new Human(), God);
        ne.evaluate().should.be.false();
    });
});