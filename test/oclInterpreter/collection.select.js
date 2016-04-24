'use strict';
const should = require('should');

import OclParserGenerator from './../../lib/oclParserGenerator'
import FixtureFactory from '../fixture.factory'

let OclParser;

describe('Collection->select ', () => {
    const mother = FixtureFactory.createPerson('Hilde', 50);

    before(() => {
        OclParserGenerator.generate();
        OclParser = require('./../../lib/oclParser').default;
    });

    it('should parse select', () => {
        const oclExpression = `
                context Object 
                    inv: self.a->select(a | a < 2)->size = 1
           `;

        const obj = {
            a: [1, 4]
        };

        const oclRule = new OclParser(oclExpression).parse();
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

        const oclRule = new OclParser(oclExpression).parse();
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

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate(mother);
        actual.should.be.true();
    });

});



