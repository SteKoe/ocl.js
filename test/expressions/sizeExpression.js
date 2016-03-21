const should = require('should');

import VariableExpression from '../../lib/expressions/variableExpression'
import SizeExpression from '../../lib/expressions/sizeExpression'

describe('SizeExpression', () => {
    it('should evaluate isEmtpy when empty', () => {
        //self.children->isEmpty()
        const ne = new SizeExpression(new VariableExpression('self.children'));

        ne.evaluate({name: 'Otto'}).should.eql(0);
        ne.evaluate({name: 'Otto', children: []}).should.eql(0);
    });

    it('should evaluate isEmpty when not empty', () => {
        const ne = new SizeExpression(new VariableExpression('self.children'));

        ne.evaluate({name: 'Otto', children: [1]}).should.eql(1);
    });
});