const should = require('should');

import {BooleanExpression} from '../../src/components/expressions/literal/booleanExpression'
import {Expression} from "../../src/components/expressions/expression";
import {AndExpression} from '../../src/components/expressions/gate/andExpression'


describe('Expression', () => {
    it('should throw', () => {
        const expr = new Expression();
        (function() {expr.evaluate()}).should.throw();
    });
});