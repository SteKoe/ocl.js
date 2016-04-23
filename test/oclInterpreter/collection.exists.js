'use strict';
const should = require('should');

import OclParserGenerator from './../../lib/oclParserGenerator'
import FixtureFactory from './../fixture.factory.js';

const mother  = FixtureFactory.createPerson('Hilde');
mother.children = [
    FixtureFactory.createPerson('A', 1),
    FixtureFactory.createPerson('B', 9),
    FixtureFactory.createPerson('C', 18)
];

describe('Collection->exists', () => {
    let OclParser;

    before(() => {
        OclParserGenerator.generate();
        OclParser = require('./../../lib/oclParser').default;
    });

    it('should evaluate exists()', () => {
        const oclExpression = `
            context Person inv:
                self.children->exists(c|c.age > 20)
        `;

        const oclRule = new OclParser(oclExpression).parse();
        oclRule.evaluate(mother).should.be.false();
    });

    it('should return names for all children when using chained attributes', () => {
        const oclExpression = `
            context Person inv:
                self.children.name->exists(n | n = "A") and
                self.children.name->exists(n | n = "B") and
                self.children.name->exists(n | n = "D")
       `;

        const oclRule = new OclParser(oclExpression).parse();
        let actual = oclRule.evaluate(mother);
        actual.should.be.false();
    });
});