'use strict';
import { expect } from "chai";
import { OclParser } from "../../lib/components/parser/OclParser";
import { Person } from "../fixture.factory";

require('../../generator/oclParserGenerator');

describe('OCLInterpreter ', () => {
    describe('derive', () => {
        it('sets variable on derive', () => {
            let oclExpression = `
                context Person::age : Integer
                    derive: 12
            `;

            let person = new Person();
            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate(person);
            expect(person.age).to.equal(12);
            expect(actual).to.be.true;
        });

        it('derive wins over init', () => {
            let oclExpression = `
                context Person::age : Integer
                    init: 10
                    derive: 12
            `;

            let person = new Person();
            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate(person);
            expect(person.age).to.equal(12);
            expect(actual).to.be.true;
        });

        it('derive using if', () => {
            let oclExpression = `
                context Person::money : Integer
                    derive: if age < 18 then 15 else 10000 endif
            `;

            let person = new Person(12);
            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate(person);
            expect(person.money).to.equal(15);
            expect(actual).to.be.true;
        });

    });
});

