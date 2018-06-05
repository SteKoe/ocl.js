'use strict';
import { expect } from "chai";
import { OclParser } from '../../lib/components/parser/OclParser'

require('../../generator/oclParserGenerator');

describe('OCLInterpreter', () => {
    describe('SumExpression', () => {
        it('sums up the numbers', () => {
            let oclExpression = `
                context Object
                    inv: self.a->sum() = 10
            `;

            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate({ a: [1, 2, 3, 4] });
            expect(actual).to.be.true;
        });

        it('returns the sum of the child\'s ages', () => {
            let oclExpression = `
                context Object
                    inv: self.children.age->sum() = 93
            `;

            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate({
                children: [
                    { age: 29 },
                    { age: 31 },
                    { age: 33 }
                ]
            });
            expect(actual).to.be.true;
        });

    });
});