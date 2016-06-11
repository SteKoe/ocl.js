const should = require('should');

import {VariableExpression} from '../../src/components/expressions/variableExpression'
import {IsNotEmptyExpression} from '../../src/components/expressions/isNotEmptyExpression'

describe('IsNotEmptyExpression', () => {
    it('should evaluate isNotEmtpy when empty', () => {
        const ne = new IsNotEmptyExpression(new VariableExpression('self.children'));

        ne.evaluate({name: 'Otto'}).should.be.false();
        ne.evaluate({name: 'Otto', children: []}).should.be.false();
    });

    it('should evaluate isEmpty when not empty', () => {
        const ne = new IsNotEmptyExpression(new VariableExpression('self.children'));

        ne.evaluate({name: 'Otto', children: [1]}).should.be.true();
    });
});