import { expect } from "chai";
import { SumOperation } from '../../../lib/components/expressions/collection'

describe('SumOperation', () => {
    it('works for numbers', () => {
        const expr = new SumOperation({
            evaluate() {
                return [1, 2, 3, 4]
            }
        });
        expect(expr.evaluate()).to.equal(10);
    });
});