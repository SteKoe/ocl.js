import {expect} from "chai";
import {VariableExpression} from "../../lib/components/expressions/variableExpression";

describe('VariableExpression', () => {
    const person = {
        name: 'Stephan',
        age: 29,
        contact: {
            web: 'www.stekoe.de'
        }
    };

    it('to evaluate self', () => {
        const expr = new VariableExpression('self');
        expect(expr.evaluate(person)).to.eql(person);
    });

    it('to evaluate variable', () => {
        const expr = new VariableExpression('c1');
        expect(expr.evaluate(person, {c1: 'anything'})).to.eql('anything');
    });

    it('to evaluate nested variables', () => {
        const expr = new VariableExpression('self.contact.web');
        expect(expr.evaluate(person)).to.eql(person.contact.web);
    });

    it('to evaluate undefined nested variables', () => {
        const expr = new VariableExpression('self.a.web');
        expect(expr.evaluate(person)).not.be.true
    });
});