import { OclEngine } from '../../../lib';
import { expect } from 'chai';

describe('Math->min', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = new OclEngine();
    });

    it('should find the lower number', () => {
        const expression = oclEngine.createQuery('5->min(6)');
        const result = oclEngine.evaluateQuery({}, expression);
        expect(result).to.equal(5);
    });
});
