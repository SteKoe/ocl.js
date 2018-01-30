import {expect} from "chai";

import {OclIsKindOfExpression} from '../../src/components/expressions/oclIsKindOfExpression'

class Animal {}
class Human extends Animal {}
class God {}

describe('OclIsKindOfExpression', () => {
    it('should evaluate truthy.', () => {
        const ne = new OclIsKindOfExpression(new Human(), Human);
        expect(ne.evaluate()).to.be.true;
    });

    it('should evaluate true for super class.', () => {
        const ne = new OclIsKindOfExpression(new Human(), Animal);
        expect(ne.evaluate()).to.be.true;
    });

    it('should evaluate false for unassociated class.', () => {
        const ne = new OclIsKindOfExpression(new Human(), God);
        expect(ne.evaluate()).to.be.false;
    });
});