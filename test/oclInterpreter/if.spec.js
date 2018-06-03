'use strict';
import { expect } from "chai";
import { OclParser } from "../../lib/components/parser/OclParser";
import Person from "../../examples/class/person";

require('../../generator/oclParserGenerator');

describe('OCLInterpreter ', () => {
    describe('if', () => {

        let oclExpression = `
            context Person::underage : Boolean
                init: if age < 18 then true else false endif
        `;
        let oclRule = OclParser.parse(oclExpression);

        it('sets variable for if', () => {
            let person = new Person();
            person.age = 2;

            let actual = oclRule.evaluate(person);
            expect(person.underage).to.be.true;
        });

        it('sets variable for then', () => {
            let person = new Person();
            person.age = 22;

            let actual = oclRule.evaluate(person);
            expect(person.underage).to.be.false;
        });
    });
});

