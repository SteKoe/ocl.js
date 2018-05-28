import {expect} from "chai";
import {NilExpression} from "../../lib/components/expressions/NilExpression";

describe('NilExpression', () => {
    it('should evaluate to undefined', () => {
        const ne = new NilExpression();
        expect(ne.evaluate()).to.be.undefined;
        expect(ne.evaluate()).to.not.be.null;
    });
});