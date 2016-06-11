const should = require('should');

import {VariableExpression} from '../../src/components/expressions/variableExpression'

describe('VariableExpression', () => {
    const person = {
        name: 'Stephan',
        age: 29,
        contact: {
            web: 'www.stekoe.de'
        }
    };

    it('should evaluate self', () => {
        const expr = new VariableExpression('self');
        expr.evaluate(person).should.eql(person);
    });

    it('should evaluate variable', () => {
        const expr = new VariableExpression('c1');
        expr.evaluate(person, {c1: 'anything'}).should.eql('anything');
    });

    it('should evaluate nested variables', () => {
        const expr = new VariableExpression('self.contact.web');
        expr.evaluate(person).should.eql(person.contact.web);
    });

    it('should evaluate undefined nested variables', () => {
        const expr = new VariableExpression('self.a.web');
        should(expr.evaluate(person)).not.be.ok();
    });
});