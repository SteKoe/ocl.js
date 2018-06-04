'use strict';
import { expect } from "chai";
import { OclParser } from '../../lib/components/parser/OclParser'

require('../../generator/oclParserGenerator');

describe.only('OCLInterpreter', () => {
    describe('SumOperation', () => {
        it('sums up the numbers', () => {
            let oclExpression = `
                context Object
                    inv: self.a->sum() = 10
            `;

            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate({ a: [1, 2, 3, 4] });
            expect(actual).to.be.true;
        });
    });
});