import { expect } from "chai";
import {
    AtExpression,
    FirstExpression,
    LastExpression,
    NumberExpression,
    UnionExpression,
    VariableExpression
} from "../../lib/components/expressions";

describe('SequenceExpressions', () => {
    const selfA = new VariableExpression('self.a');
    const selfB = new VariableExpression('self.b');
    var obj = {
        a: [1, 2],
        b: [3, 4]
    };

    describe('UnionExpression', () => {
        it('concats arrays', () => {
            const expr = new UnionExpression(selfA, selfB);
            var result = expr.evaluate(obj);
            expect(result).to.eql([1, 2, 3, 4]);
        });
    });

    describe('AtOperation', () => {
        it('returns position', () => {
            const expr = new AtExpression(selfA, new NumberExpression(1));
            var result = expr.evaluate(obj);
            expect(result).to.eql(2);
        });
    });

    describe('FirstExpression', () => {
        it('returns position', () => {
            const expr = new FirstExpression(selfA);
            var result = expr.evaluate(obj);
            expect(result).to.eql(1);
        });
    });

    describe('LastExpression', () => {
        it('returns position', () => {
            const expr = new LastExpression(selfA);
            var result = expr.evaluate(obj);
            expect(result).to.eql(2);
        });
    });

});