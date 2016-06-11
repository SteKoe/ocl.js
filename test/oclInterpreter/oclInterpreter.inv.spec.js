'use strict';
const should = require('should');

require('../../generator/oclParserGenerator');
import {OclParser} from '../../src/components/parser/oclParser';
import {FixtureFactory} from '../fixture.factory'

describe('OCLInterpreter: inv ', () => {
    const mother = FixtureFactory.createPerson('Hilde', 50);

    it('should evaluate self.parent <> self', () => {
        const oclExpression = `
            context Person
                inv: self.parent <> self
        `;
        const oclRule = OclParser.parse(oclExpression);

        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();

        // Now set self to parent
        mother.parent = mother;
        actual = oclRule.evaluate(mother);
        actual.should.not.be.ok();
    });


    it('should evaluate boolean expression with braces.', () => {
        class MetaAttribute {
        }

        const attr = new MetaAttribute();
        attr.minCard = 0;
        attr.maxCard = 10;

        const oclExpression = `
            context MetaAttribute inv:
                self.minCard <= self.maxCard or (self.minCard = nil and self.maxCard = nil)
        `;

        const oclRule = OclParser.parse(oclExpression);
        oclRule.evaluate(attr).should.be.true();
    });

    it('should execute function calls without braces', () => {
        const oclExpression = `
            context Person inv:
                self.name->isNotEmpty
       `;

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.be.ok();
    });

    it('size should return array size', () => {
        const oclExpression = `
            context Person inv:
                self.children->size() = 4
       `;

        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 4),
            FixtureFactory.createPerson('D', 8)
        ];

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.be.true();
    });

    it('size should return array size II', () => {
        const oclExpression = `
            context Person 
            inv: self.children->size() = 4
            inv: self.children->isEmpty()
       `;

        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 4),
            FixtureFactory.createPerson('D', 8)
        ];

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(mother);
        actual.should.be.false();
    });

    it('should return set', () => {
        const oclExpression = `
            context Person 
                inv: self.a->asSet()->size() = 4
       `;

        const obj = {
            a: [1, 2, 2, 3, 3, 3, 3, 4]
        };

        const oclRule = OclParser.parse(oclExpression);
        let actual = oclRule.evaluate(obj);
        actual.should.be.false();
    });

});

