import {expect} from "chai";

import {NumberExpression} from '../../src/components/expressions/literal/numberExpression'

describe('NumberExpression', () => {
    it('should evaluate number.', () => {
        const ne = new NumberExpression(1337);
        expect(ne.evaluate()).to.equal(1337);
    });

    it('should evaluate string which is a number.', () => {
        const ne = new NumberExpression('1337');
        expect(ne.evaluate()).to.equal(1337);
    });

    it('should throw an error when no number is provided.', () => {
        expect(() => new NumberExpression('miau')).to.throw();
    });
});