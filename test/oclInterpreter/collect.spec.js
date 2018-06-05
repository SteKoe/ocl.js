'use strict';
import { expect } from "chai";
import { OclParser } from '../../lib/components/parser/OclParser'

require('../../generator/oclParserGenerator');

describe('OCLInterpreter', () => {
    describe('CollectExpression', () => {
        it('sums up the age using collect', () => {
            let oclExpression = `
                context Object
                    inv: self.children->collect(child | child.age)->sum() = 6
            `;

            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate({
                children: [
                    { age: 1 },
                    { age: 2 },
                    { age: 3 }
                ]
            });
            expect(actual).to.be.true;
        });

        it('compares the result of collect->sum and ->sum', () => {
            let oclExpression = `
                context Object
                    inv: self.children->collect(child | child.age)->sum() = self.children.age->sum()
            `;

            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate({
                children: [
                    { age: 10 },
                    { age: 20 },
                    { age: 30 }
                ]
            });
            expect(actual).to.be.true;
        });

    });
});