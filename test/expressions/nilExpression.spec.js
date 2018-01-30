import {expect} from "chai";

import {NilExpression} from '../../src/components/expressions/nilExpression'

describe('NilExpression', () => {
    it('should evaluate to undefined', () => {
        const ne = new NilExpression();
        expect(ne.evaluate()).to.be.undefined;
        expect(ne.evaluate()).to.not.be.null;
    });
});