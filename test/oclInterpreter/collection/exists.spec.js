'use strict';
import { expect } from "chai";
import { FixtureFactory } from "./../../fixture.factory.js";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('Collection->exists', () => {
    const mother = FixtureFactory.createPerson('Hilde');
    mother.children = [
        FixtureFactory.createPerson('A', 1),
        FixtureFactory.createPerson('B', 9),
        FixtureFactory.createPerson('C', 18)
    ];

    it('should evaluate exists()', () => {
        const oclExpression = `
            context Person inv:
                self.children->exists(c|c.age > 20)
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(mother)).to.be.false;
    });

    it('should return names for all children when using chained attributes', () => {
        const oclExpression = `
            context Person inv:
                self.children.name->exists(n | n = "A") and
                self.children.name->exists(n | n = "B") and
                self.children.name->exists(n | n = "D")
       `;

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        expect(actual).to.be.false;
    });
});