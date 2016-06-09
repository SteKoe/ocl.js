'use strict';
const should = require('should');

import OclParserGenerator from '../../lib/parser/oclParserGenerator'
import FixtureFactory from '../fixture.factory'

let OclParser;

describe('Collection->forAll', () => {
    const mother = FixtureFactory.createPerson('Hilde', 50);

    before(() => {
        OclParserGenerator.generate();
        OclParser = require('./../../lib/parser/oclParser').default;
    });

    it('should evaluate forAll(c|...): negative', () => {
        const oclExpression = `
            context Person
                inv ChildrenAreAllYounger: self.children->forAll(c|c.age < self.age)
        `;

        mother.children = [
            FixtureFactory.createPerson('A', 10),
            FixtureFactory.createPerson('B', 50)
        ];

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.not.be.ok();
    });

    it('should evaluate forAll(c|...): positive', () => {
        const oclExpression = `
            context Person inv:
                self.children->forAll(c|c.age < self.age)
        `;

        mother.children = [
            FixtureFactory.createPerson('A', 10),
            FixtureFactory.createPerson('B', 40)
        ];

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();
    });

    it('should evaluate forAll(c1,c2|...): positive', () => {
        // All children have different ages
        const oclExpression = `
            context Person inv:
                self.children->forAll(c1, c2|c1.age <> c2.age)
        `;

        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 3),
            FixtureFactory.createPerson('D', 4),
            FixtureFactory.createPerson('E', 5)
        ];

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();
    });

    it('should evaluate forAll(c1,c2|...): negative', () => {
        // All children have different ages
        const oclExpression = `
            context Person inv:
                self.children->forAll(c1, c2|c1.age <> c2.age)
        `;

        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 2),
            FixtureFactory.createPerson('D', 4),
            FixtureFactory.createPerson('E', 5)
        ];

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.not.be.ok();
    });

    it('should iterate over collected items without having a collector', () => {
        const oclExpression = `
            context Person inv:
                self.children->forAll(age < 10)
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
        actual.should.be.false();
    });
});

