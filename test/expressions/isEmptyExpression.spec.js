const should = require('should');

import {VariableExpression} from '../../src/components/expressions/variableExpression'
import {IsEmptyExpression} from '../../src/components/expressions/isEmptyExpression'

describe('IsEmptyExpression', () => {
    it('should evaluate isEmtpy when empty', () => {
        //self.children->isEmpty()
        const ne = new IsEmptyExpression(new VariableExpression('self.children'));

        ne.evaluate({name: 'Otto'}).should.be.true();
        ne.evaluate({name: 'Otto', children: []}).should.be.true();
    });

    it('should evaluate isEmpty when not empty', () => {
        const ne = new IsEmptyExpression(new VariableExpression('self.children'));

        ne.evaluate({name: 'Otto', children: [1]}).should.be.false();
    });
});