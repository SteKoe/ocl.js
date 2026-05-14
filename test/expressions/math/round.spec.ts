import { OclEngine } from '../../../lib';
import { expect } from 'vitest';

describe('Math.round', () => {
    let oclEngine;

    beforeEach(() => {
        oclEngine = new OclEngine();
    });

    it('should round a number', () => {
        let result = oclEngine.evaluateQuery({}, oclEngine.createQuery('2.3.round()'));
        expect(result).toBe(2);

        result = oclEngine.evaluateQuery({}, oclEngine.createQuery('2.5.round()'));
        expect(result).toBe(3);

        result = oclEngine.evaluateQuery({}, oclEngine.createQuery('2.8.round()'));
        expect(result).toBe(3);

        result = oclEngine.evaluateQuery({}, oclEngine.createQuery('2->round()'));
        expect(result).toBe(2);
    });
});

