const should = require('should');

import AttributeCallExpression from '../../lib/expressions/attributeCallExpression'

describe('AttributeCallExpression', () => {
    it('should evaluate self.name', () => {
        const ne = new AttributeCallExpression('self', 'name');

        ne.evaluate({name: 'Otto'}).should.equal('Otto');
    });

    it('should evaluate self.name', () => {
        const ne = new AttributeCallExpression('self', ['child', 'name']);

        const person = {
            name: 'Otto',
            child: {
                name: 'Detlef'
            }
        };

        ne.evaluate(person).should.equal('Detlef');
    });

    it('should not break when attribute chain is invalid', () => {
        const ne = new AttributeCallExpression('self', ['a', 'b', 'c']);

        (typeof ne.evaluate({})).should.be.undefined;
    })
});