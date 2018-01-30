import {expect} from "chai";
import {OclIsTypeOfExpression} from "../../src/components/expressions/oclIsTypeOfExpression";

class Animal {
}
class Human extends Animal {
}
class God {
}

describe('OclIsKindOfExpression', () => {
    it('should evaluate truthy.', () => {
        const ne = new OclIsTypeOfExpression(new Human(), Human);
        expect(ne.evaluate()).to.be.true;
    });

    it('should evaluate true for super class.', () => {
        const ne = new OclIsTypeOfExpression(new Human(), Animal);
        expect(ne.evaluate()).to.be.false;
    });

    it('should evaluate false for unassociated class.', () => {
        const ne = new OclIsTypeOfExpression(new Human(), God);
        expect(ne.evaluate()).to.be.false;
    });
});