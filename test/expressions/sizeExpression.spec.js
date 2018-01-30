import {expect} from "chai";
import {VariableExpression} from "../../src/components/expressions/variableExpression";
import {SizeExpression} from "../../src/components/expressions/collection/sizeExpression";

describe('SizeExpression', () => {
    it('to evaluate isEmtpy when empty', () => {
        //self.children->isEmpty()
        const ne = new SizeExpression(new VariableExpression('self.children'));

        expect(ne.evaluate({name: 'Otto'})).to.eql(0);
        expect(ne.evaluate({name: 'Otto', children: []})).to.eql(0);
    });

    it('to evaluate isEmpty when not empty', () => {
        const ne = new SizeExpression(new VariableExpression('self.children'));

        expect(ne.evaluate({name: 'Otto', children: [1, 2, 3, 4, 6]})).to.eql(5);
    });
});