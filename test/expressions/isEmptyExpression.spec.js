import {expect} from "chai";
import {VariableExpression} from "../../lib/components/expressions/VariableExpression";
import {IsEmptyExpression} from "../../lib/components/expressions/IsEmptyExpression";

describe('IsEmptyExpression', () => {
    it('should evaluate isEmtpy when empty', () => {
        //self.children->isEmpty()
        const ne = new IsEmptyExpression(new VariableExpression('self.children'));

        expect(ne.evaluate({name: 'Otto'})).to.be.true;
        expect(ne.evaluate({name: 'Otto', children: []})).to.be.true;
    });

    it('should evaluate isEmpty when not empty', () => {
        const ne = new IsEmptyExpression(new VariableExpression('self.children'));

        expect(ne.evaluate({name: 'Otto', children: [1]})).to.be.false;
    });

    it('should not fail when getting weird values', () => {
        const ne = new IsEmptyExpression(new VariableExpression('self.children'));

        expect(ne.evaluate({name: 'Otto', children: null})).to.be.true;
        expect(ne.evaluate({name: 'Otto', children: undefined})).to.be.true;
        expect(ne.evaluate({name: 'Otto', children: 1})).to.be.true;
    });
});