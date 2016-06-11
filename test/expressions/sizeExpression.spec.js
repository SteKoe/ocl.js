const should = require('should');

import {VariableExpression} from '../../src/components/expressions/variableExpression'
import {SizeExpression} from '../../src/components/expressions/sizeExpression'

describe('SizeExpression', () => {
    it('should evaluate isEmtpy when empty', () => {
        //self.children->isEmpty()
        const ne = new SizeExpression(new VariableExpression('self.children'));

        ne.evaluate({name: 'Otto'}).should.eql(0);
        ne.evaluate({name: 'Otto', children: []}).should.eql(0);
    });

    it('should evaluate isEmpty when not empty', () => {
        const ne = new SizeExpression(new VariableExpression('self.children'));

        ne.evaluate({name: 'Otto', children: [1,2,3,4,6]}).should.eql(5);
    });
});