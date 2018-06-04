'use strict';
import { expect } from "chai";
import { FixtureFactory } from "../fixture.factory";
import { OclParser } from "../../lib/components/parser/OclParser";

require('../../generator/oclParserGenerator');

describe('OCLInterpreter', () => {
    describe('ImpliesExpression', () => {
        const mother = FixtureFactory.createPerson('Hilde', 50);

        it('should evaluate implies: positive', () => {
            const oclExpression = `
                context Person inv:
                    self.age > 0 implies self.age <> 0
           `;

            const oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate(mother);
            expect(actual).to.be.true;
        });

        it('should evaluate implies: negative', () => {
            const oclExpression = `
                context Person inv:
                    self.age > 0 implies self.age = 0
           `;

            const oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate(mother);
            expect(actual).to.not.be.true;
        });

        it('should evaluate implies with more complex expressions', () => {
            const oclExpression = `
                context Person inv:
                    self.name->isNotEmpty() implies self.name <> ""
           `;

            const oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate(mother);
            expect(actual).to.be.true;
        });
    });
});
