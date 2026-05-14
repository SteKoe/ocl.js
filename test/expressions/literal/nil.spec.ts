import { expect } from 'vitest';
import { NilExpression } from '../../../lib/components/expressions/literal';

describe('NilExpression', () => {
    it('asdasd', () => {
        const expression = new NilExpression();
        expect(expression.parseValue()).toBeUndefined();
    });
});

