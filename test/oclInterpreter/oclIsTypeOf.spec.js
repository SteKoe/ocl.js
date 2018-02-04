'use strict';
import { expect } from "chai";
import { OclParser } from "../../lib/components/parser/oclParser";
import { FixtureFactory } from "../fixture.factory";

require('../../generator/oclParserGenerator');

describe('OCLInterpreter ', () => {
    describe('oclIsTypeOf', () => {
        const mother = FixtureFactory.createPerson('Hilde');

        it('evaluates correctly if type is given as string', () => {
            let oclExpression = `
                context Person
                    inv: self->oclIsTypeOf("Person")
            `;
            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate(mother);
            expect(actual).to.be.ok;

            oclExpression = `
                context Person
                    inv: self->oclIsTypeOf("Entity")
            `;
            oclRule = OclParser.parse(oclExpression);
            actual = oclRule.evaluate(mother);
            expect(actual).to.be.not.ok;
        });

    });
});

