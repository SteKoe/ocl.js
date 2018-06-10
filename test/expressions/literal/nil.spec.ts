import { expect } from 'chai';
import { NilExpression } from '../../../lib/components/expressions/literal';

describe('NilExpression', () => {
    it('asdasd', () => {
        const expression = new NilExpression();
        expect(expression.parseValue()).to.be.undefined;
    });
});
