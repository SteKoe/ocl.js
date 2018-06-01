import { expect } from "chai";
import { OclIsUndefinedExpression } from '../../lib/components/expressions/OclIsUndefinedExpression'
import { VariableExpression } from '../../lib/components/expressions'


describe('OclIsUndefinedExpression', () => {
    it('should return true if not set', () => {
        let expression = new OclIsUndefinedExpression(new VariableExpression("self.name"))
        expect(expression.evaluate({})).to.be.true;
    });

    it('should return true if undefined', () => {
        let expression = new OclIsUndefinedExpression(new VariableExpression("self.name"))
        expect(expression.evaluate({ name: undefined })).to.be.true;
    });

    it('should return false if not set', () => {
        let expression = new OclIsUndefinedExpression(new VariableExpression("self.name"))
        expect(expression.evaluate({ name: 'Name' })).to.be.false;
    });
});