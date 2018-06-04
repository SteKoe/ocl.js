import { expect } from "chai";
import { VariableExpression } from "../../lib/components/expressions/VariableExpression";

describe('VariableExpression', () => {
    const person = {
        name: 'Stephan',
        age: 29,
        contact: {
            web: 'www.stekoe.de'
        },
        children: [
            { age: 1 },
            { age: 2 },
            { age: 3 }
        ]
    };

    it('to evaluate self', () => {
        const expr = new VariableExpression('age');
        expect(expr.evaluate(person)).to.equal(person.age);
    });

    it('to evaluate self', () => {
        const expr = new VariableExpression('self');
        expect(expr.evaluate(person)).to.eql(person);
    });

    it('to evaluate variable', () => {
        const expr = new VariableExpression('c1');
        expect(expr.evaluate(person, { c1: 'anything' })).to.eql('anything');
    });

    it('to evaluate nested variables', () => {
        const expr = new VariableExpression('self.contact.web');
        expect(expr.evaluate(person)).to.eql(person.contact.web);
    });

    it('to evaluate undefined nested variables', () => {
        const expr = new VariableExpression('self.a.web');
        expect(expr.evaluate(person)).not.be.true
    });

    it('asdad', () => {
        const expr = new VariableExpression('children.age');
        expect(expr.evaluate(person)).to.eql([1,2,3])
    });
});