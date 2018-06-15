import { OclEngine } from '../../../lib';
import { expect } from 'chai';

describe('Math.max', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = new OclEngine();
    });

    it('should find the greatest number', () => {
        let result = oclEngine.evaluateQuery({}, oclEngine.createQuery('6.max(3)'));
        expect(result).to.equal(6);

        result = oclEngine.evaluateQuery({}, oclEngine.createQuery('6.max(5.2)'));
        expect(result).to.equal(6);

        result = oclEngine.evaluateQuery({}, oclEngine.createQuery('2.3.max(3)'));
        expect(result).to.equal(3);

        result = oclEngine.evaluateQuery({}, oclEngine.createQuery('2.3.max(5.2)'));
        expect(result).to.equal(5.2);
    });
});
