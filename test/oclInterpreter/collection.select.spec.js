'use strict';
const should = require('should');

require('../../generator/oclParserGenerator');
import {FixtureFactory} from "../fixture.factory";
import {OclParser} from "../../lib/components/parser/OclParser";

describe('Collection->select ', () => {
    const mother = FixtureFactory.createPerson('Hilde', 50);

    it('should parse select', () => {
        const oclExpression = `
                context Object 
                    inv: self.a->select(a | a < 2)->size = 1
           `;

        const obj = {
            a: [1, 4]
        };

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(obj);
        actual.should.be.true();
    });

    it('should evaluate select()', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 4),
            FixtureFactory.createPerson('D', 8),
            FixtureFactory.createPerson('E', 10)
        ];

        const oclExpression = `
            context Person inv:
                self.children->select(c|c.age < 10)->size() = 4
        `;

        const oclRule = OclParser.parse(oclExpression);
        oclRule.evaluate(mother).should.be.true();
    });

    it('should iterate over collected items', () => {
        const oclExpression = `
            context Person inv:
                self.children->select(c|c.age < 10)->forAll(c|c.age<10)
       `;

        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 4),
            FixtureFactory.createPerson('D', 8),
            FixtureFactory.createPerson('E', 10)
        ];

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.be.true();
    });

});



