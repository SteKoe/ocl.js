'use strict';
import { expect } from "chai";
import { OclParser } from "../../lib/components/parser/OclParser";
import Person from "../../examples/class/person";

require('../../generator/oclParserGenerator');

describe('OCLInterpreter ', () => {
    describe('init', () => {
        it('sets variable on init', () => {
            let oclExpression = `
                context Person::age : Integer
                    init: 12
            `;

            let person = new Person();
            let oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate(person);
            expect(person.age).to.equal(12);
            expect(actual).to.be.true;
        });

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
    });
});
