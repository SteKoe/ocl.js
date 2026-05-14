import { OclEngine } from '../../../lib';
import { expect } from 'vitest';

describe('Collection->append', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = new OclEngine();
    });

    it('should append a new element', () => {
        const expression = oclEngine.createQuery('self->append(4)');
        const result = oclEngine.evaluateQuery([1, 2, 3], expression);
        expect(result).toStrictEqual([1, 2, 3, 4]);
    });

    it('should not crash when not passing anything', () => {
        const expression = oclEngine.createQuery('self->append()');
        const result = oclEngine.evaluateQuery([1, 2, 3], expression);
        expect(result).toStrictEqual([1, 2, 3]);
    });
});

