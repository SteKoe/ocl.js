'use strict';
import { expect } from "chai";
import { FixtureFactory } from "./../fixture.factory.js";
import { OclParser } from "../../lib/components/parser/OclParser";

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
                self.getChildren()->exists(c|c.age > 20)
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(mother)).to.be.false;
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
                self.getB().getC() = "C"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(A)).to.be.true;
    });

    it('should evaluate to false if function cannot be called', () => {
        const oclExpression = `
            context Person inv:
                self.notDefinedFunction()
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(mother)).to.be.false;
    });

    it('should evaluate to false if object the function is called on is undefined', () => {
        const oclExpression = `
            context Person inv:
                self.undefinedProperty.undefinedFunction()
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(mother)).to.be.false;
    });

    it('should accept one parameter in a function call', () => {
        const A = {
            getValue(val) {
                return val;
            }
        }

        const oclExpression = `
            context Object inv:
                self.getValue("A") = "A"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(A)).to.be.true;
    });

    it('should accept more parameters in a function call', () => {
        const A = {
            add(a, b) {
                return a + b;
            }
        }

        const oclExpression = `
            context Object inv:
                self.add(6,4) = 10
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(A)).to.be.true;
    });

    it('does even work with nested function calls', () => {
        const A = {
            add(a, b) {
                return a + b;
            }
        }

        const oclExpression = `
            context Object inv:
                self.add(6, self.add(2,2)) = 10
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate(A)).to.be.true;
    });
});