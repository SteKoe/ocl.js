const should = require('should');

import AttributeCallExpression from '../../lib/expressions/attributeCallExpression'
import IsEmptyExpression from '../../lib/expressions/isEmptyExpression'

describe('IsEmptyExpression', () => {
    it('should evaluate isEmtpy when empty', () => {
        const ne = new IsEmptyExpression(new AttributeCallExpression('self', 'children'));

        ne.evaluate({name: 'Otto'}).should.be.true;
        ne.evaluate({name: 'Otto', children: []}).should.be.true;
    });

    it('should evaluate isEmpty when not empty', () => {
        const ne = new IsEmptyExpression(new AttributeCallExpression('self', 'children'));

        ne.evaluate({name: 'Otto', children: [1]}).should.be.true;
    });
});