import {expect} from "chai";
import {NativeJsFunctionCallExpression} from "../../lib/components/expressions/NativeJsFunctionCallExpression";
import {VariableExpression} from "../../lib/components/expressions";

describe('NativeJsFunctionCallExpression', () => {
    const obj = {
        getName() {
            return "Name";
        }
    };

    it('calls existing function on existing object', () => {
        const variableExpression = new VariableExpression("self");
        const functionCallExpression = new NativeJsFunctionCallExpression(variableExpression, 'getName');
        expect(functionCallExpression.evaluate(obj)).to.equal("Name");
    });

    it('returns false for non existing function', () => {
        const variableExpression = new VariableExpression("self");
        const functionCallExpression = new NativeJsFunctionCallExpression(variableExpression, 'getNonExistingProperty');
        expect(functionCallExpression.evaluate(obj)).to.be.false;
    });

    it('returns false for non existing object', () => {
        const variableExpression = new VariableExpression("self.undefinedProperty");
        const functionCallExpression = new NativeJsFunctionCallExpression(variableExpression, 'getNonExistingProperty');
        expect(functionCallExpression.evaluate(obj)).to.be.false;
    });
});