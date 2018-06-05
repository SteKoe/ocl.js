import { expect } from "chai";
import { SumExpression } from '../../../lib/components/expressions/collection'

describe('SumExpression', () => {
    it('works for numbers', () => {
        const expr = new SumExpression({
            evaluate() {
                return [1, 2, 3, 4]
            }
        });
        expect(expr.evaluate()).to.equal(10);
    });
});