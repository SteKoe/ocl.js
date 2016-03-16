const should = require('should');

import AttributeCallExpression from '../../lib/expressions/attributeCallExpression'
import IsNotEmptyExpression from '../../lib/expressions/isNotEmptyExpression'

describe('IsEmptyExpression', () => {
    it('should evaluate isNotEmtpy when empty', () => {
        const ne = new IsNotEmptyExpression(new AttributeCallExpression('self', 'children'));

        ne.evaluate({name: 'Otto'}).should.be.false;
        ne.evaluate({name: 'Otto', children: []}).should.be.false;
    });

    it('should evaluate isEmpty when not empty', () => {
        const ne = new IsNotEmptyExpression(new AttributeCallExpression('self', 'children'));

        ne.evaluate({name: 'Otto', children: [1]}).should.be.true;
    });
});