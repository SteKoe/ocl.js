import { OclEngine } from '../../../lib';
import { expect } from 'chai';

describe('Collection->any', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = new OclEngine();
    });

    it('should find one element using iterator', () => {
        const expression = oclEngine.createQuery('self->any(i | i < 1)');
        const result = oclEngine.evaluateQuery([1.2, 2.3, 5.2, 0.9], expression);
        expect(result).to.equal(0.9);
    });

    it('should find one element without using iterator', () => {
        const expression = oclEngine.createQuery('self->any( i < 1)');
        const result = oclEngine.evaluateQuery([1.2, 2.3, 5.2, 0.9], expression);
        expect(result).to.equal(0.9);
    });

    it('should not find an element', () => {
        const expression = oclEngine.createQuery('self->any( i < 0 )');
        const result = oclEngine.evaluateQuery([1.2, 2.3, 5.2, 0.9], expression);
        expect(result).to.be.undefined;
    });
});
