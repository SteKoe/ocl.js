import { OclEngine } from '../../../lib';
import { expect } from 'chai';

describe('Math.div', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = new OclEngine();
    });

    it.only('should find quotient', () => {
        let result = oclEngine.evaluateQuery({}, oclEngine.createQuery('3.div(2)'));
        expect(result).to.equal(1);
    });
});
