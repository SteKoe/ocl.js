import {expect} from 'chai';
import {OclEngine} from '../../../lib';

describe('NumberExpression', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = new OclEngine();
    });

    it('should parse number even if there are _ used to structure them', () => {
        const expression = oclEngine.createQuery('1_000_000_000');
        const result = oclEngine.evaluateQuery({}, expression);
        expect(result).to.equal(1000000000);
    });

    it('should parse floats even if there are _ used to structure them', () => {
        const expression = oclEngine.createQuery('1_000.123_456');
        const result = oclEngine.evaluateQuery({}, expression);
        expect(result).to.equal(1000.123456);
    });
});
