const should = require('should');

import {NumberExpression} from '../../src/components/expressions/literal/numberExpression'

describe('NumberExpression', () => {
    it('should evaluate number.', () => {
        const ne = new NumberExpression(1337);
        ne.evaluate().should.be.exactly(1337);
    });

    it('should evaluate string which is a number.', () => {
        const ne = new NumberExpression('1337');
        ne.evaluate().should.be.exactly(1337);
    });

    it('should throw an error when no number is provided.', () => {
        (() => new NumberExpression('miau')).should.throw();
    });
});