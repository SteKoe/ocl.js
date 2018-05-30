import {expect} from "chai";
import { ImpliesExpression } from "../../lib/components/expressions/gate/ImpliesExpression";
import { BooleanExpression } from "../../lib/components/expressions/literal/BooleanExpression";

const TRUE = new BooleanExpression(true);
const FALSE = new BooleanExpression(false);

const expr = new ImpliesExpression();

describe.only('ImpliesExpression', () => {
    it('false implies false => true', () => {
        let impliesExpression = new ImpliesExpression(FALSE, FALSE)
        expect(impliesExpression.evaluate()).to.be.true;
    });

    it('false implies true => true', () => {
        let impliesExpression = new ImpliesExpression(FALSE, TRUE)
        expect(impliesExpression.evaluate()).to.be.true;
    });

    it('true implies false => false', () => {
        let impliesExpression = new ImpliesExpression(TRUE, FALSE)
        expect(impliesExpression.evaluate()).to.be.false;
    });

    it('true implies true => true', () => {
        let impliesExpression = new ImpliesExpression(TRUE, TRUE)
        expect(impliesExpression.evaluate()).to.be.true;
    });

});