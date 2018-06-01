'use strict';
const should = require('should');

require('../../generator/oclParserGenerator');
import {FixtureFactory} from "../fixture.factory";
import {OclParser} from "../../lib/components/parser/OclParser";

describe('ImpliesExpression', () => {
    const mother = FixtureFactory.createPerson('Hilde', 50);

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

