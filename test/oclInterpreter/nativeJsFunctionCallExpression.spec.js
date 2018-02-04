'use strict';
import { expect } from "chai";
import { FixtureFactory } from "./../fixture.factory.js";
import { OclParser } from "../../lib/components/parser/oclParser";

const should = require('should');

require('../../generator/oclParserGenerator');

describe('Eval FunctionCall', () => {
    const mother = FixtureFactory.createPerson('Hilde');
    mother.children = [
        FixtureFactory.createPerson('A', 1),
        FixtureFactory.createPerson('B', 9),
        FixtureFactory.createPerson('C', 18)
    ];

    it('should use eval to evaluate native method on object', () => {
        const oclExpression = `
            context Person inv:
                self->getChildren()->exists(c|c.age > 20)
        `;

        const oclRule = OclParser.parse(oclExpression);
        oclRule.evaluate(mother).should.be.false();
    });


    it('should call nested native functions', () => {
        const A = {
            getB() {
                return {
                    getC() {
                        return "C";
                    }
                }
            }
        }

        const oclExpression = `
            context Object inv:
                self->getB()->getC() = "C"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(A)).to.be.true;
    });
});