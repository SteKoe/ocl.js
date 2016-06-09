'use strict';
const should = require('should');

import OclParserGenerator from './../../lib/oclParserGenerator'
import FixtureFactory from '../fixture.factory'


describe('Collection->forAll', () => {
    let OclParser;
    const mother = FixtureFactory.createPerson('Hilde', 50);

    before(() => {
        OclParserGenerator.generate();
        OclParser = require('./../../lib/oclParser').default;
    });
    it('should evaluate implies: positive', () => {
        const oclExpression = `
                context Person inv:
                    self.age > 0 implies self.age <> 0
           `;

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();
    });

    it('should evaluate implies: negative', () => {
        const oclExpression = `
                context Person inv:
                    self.age > 0 implies self.age = 0
           `;

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.not.be.ok();
    });

    it('should evaluate implies with more complex expressions', () => {
        const oclExpression = `
                context Person inv:
                    self.name->isNotEmpty() implies self.name <> ""
           `;

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();
    });
});

