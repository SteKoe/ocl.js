'use strict';
import { expect } from "chai";
import { OclParser } from "../../lib/components/parser/OclParser";
import { FixtureFactory } from "../fixture.factory";

require('../../generator/oclParserGenerator');

describe('OCLInterpreter ', () => {
    describe('oclIsUndefined', () => {
        const mother = FixtureFactory.createPerson('Hilde');

        it('should return false if is defined', () => {
            let oclExpression = `
                context Person
                    inv: self.name.oclIsUndefined()
            `;
            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate(mother);
            expect(actual).to.be.false;
        });

        it('should return true if is undefined', () => {
            let oclExpression = `
                context Person
                    inv: self.age.oclIsUndefined()
            `;
            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate(mother);
            expect(actual).to.be.true;
        });
    });
});

