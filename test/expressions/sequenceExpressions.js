const should = require('should');

import VariableExpression from '../../lib/expressions/variableExpression'
import NumberExpression from '../../lib/expressions/numberExpression'
import {UnionOperation, AtOperation, FirstOperation, LastOperation} from '../../lib/expressions/sequenceExpressions'

describe('SequenceExpressions', () => {
    const selfA = new VariableExpression('self.a');
    const selfB = new VariableExpression('self.b');
    var obj = {
        a: [1,2],
        b: [3,4]
    };

    describe('UnionOperation', () => {
        it('concats arrays', () => {
            const expr = new UnionOperation(selfA, selfB);
            var result = expr.evaluate(obj);
            result.should.eql([1,2,3,4]);
        });
    });

    describe('AtOperation', () => {
        it('returns position', () => {
            const expr = new AtOperation(selfA, new NumberExpression(1));
            var result = expr.evaluate(obj);
            result.should.eql(2);
        });
    });

    describe('FirstOperation', () => {
        it('returns position', () => {
            const expr = new FirstOperation(selfA);
            var result = expr.evaluate(obj);
            result.should.eql(1);
        });
    });

    describe('LastOperation', () => {
        it('returns position', () => {
            const expr = new LastOperation(selfA);
            var result = expr.evaluate(obj);
            result.should.eql(2);
        });
    });

});