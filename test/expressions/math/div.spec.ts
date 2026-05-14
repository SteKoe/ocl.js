import { OclEngine } from '../../../lib';
import { expect } from 'vitest';

describe('Math.div', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = new OclEngine();
    });

    it('should find quotient', () => {
        const result = oclEngine.evaluateQuery({}, oclEngine.createQuery('3.div(2)'));
        expect(result).toBe(1);
    });
});

