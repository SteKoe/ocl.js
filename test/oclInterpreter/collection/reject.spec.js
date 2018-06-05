'use strict';
import { expect } from "chai";
import { OclParser } from '../../../lib/components/parser/OclParser'

require('../../../generator/oclParserGenerator');

describe('OCLInterpreter', () => {
    describe('Collection->reject ', () => {
        it('checks if there are no children older than 18 years old', () => {
            let oclExpression = `
                context Object
                    inv: self.children->reject(child | child.age < 18)->isEmpty()
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

        it('checks if there are no children older than 18 years old', () => {
            let oclExpression = `
                context Object
                    inv: self.children->reject(child | child.age < 18)->isEmpty()
            `;

            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate({
                children: [
                    { age: 1 },
                    { age: 2 },
                    { age: 30 }
                ]
            });
            expect(actual).to.be.false;
        });

        it('checks if there are no children older than 18 years old', () => {
            let oclExpression = `
                context Object
                    inv: self.seq->reject(a mod 2 = 0)->size() = 3
            `;

            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate({seq:[1,3,5,8,10]});
            expect(actual).to.be.true;
        });
    });
});