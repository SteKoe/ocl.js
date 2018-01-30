import {expect} from "chai";
import {VariableExpression} from "../../src/components/expressions/variableExpression";
import {IsNotEmptyExpression} from "../../src/components/expressions/isNotEmptyExpression";

describe('IsNotEmptyExpression', () => {
    it('should evaluate isNotEmtpy when empty', () => {
        const ne = new IsNotEmptyExpression(new VariableExpression('self.children'));

        expect(ne.evaluate({name: 'Otto'})).to.be.false;
        expect(ne.evaluate({name: 'Otto', children: []})).to.be.false;
    });

    it('should evaluate isEmpty when not empty', () => {
        const ne = new IsNotEmptyExpression(new VariableExpression('self.children'));

        expect(ne.evaluate({name: 'Otto', children: [1]})).to.be.true;
    });
});