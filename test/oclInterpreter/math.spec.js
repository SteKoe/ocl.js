'use strict';
import { expect } from "chai";
import { OclParser } from "../../lib/components/parser/OclParser";

require('../../generator/oclParserGenerator');

describe('OCLInterpreter', () => {
    describe('Math', () => {
        it('should evaluate addition.', () => {
            const oclExpression = `
            context Object inv:
                1 + 2 = 3
       `;

            const oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate();
            expect(actual).to.be.true;
        });

        it('should evaluate complexer math.', () => {
            expect(OclParser.parse(`context Object inv: 1 + 2 * 3 = 7`).evaluate()).to.be.true;
            expect(OclParser.parse(`context Object inv: (1 + 2) * 3 = 9`).evaluate()).to.be.true;
            expect(OclParser.parse(`context Object inv: 2^2 = 4`).evaluate()).to.be.true;
            expect(OclParser.parse(`context Object inv: -2^2 = 4`).evaluate()).to.be.true;
            expect(OclParser.parse(`context Object inv: -(2^2) = -4`).evaluate()).to.be.true;
        });

        it('should evaluate substraction.', () => {
            const oclExpression = `
            context Object inv:
                1.0 - 2 = -1
       `;

            const oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate();
            expect(actual).to.be.true;
        });

        it('should evaluate division.', () => {
            const oclExpression = `
            context Object inv:
                10 / 2 = 5
       `;

            const oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate();
            expect(actual).to.be.true;
        });

        it('should evaluate division using div.', () => {
            const oclExpression = `
            context Object inv:
                10 div 5 = 2
       `;

            const oclRule = OclParser.parse(oclExpression);
            console.log(oclRule.contexts[0].invs[0].definition);
            let actual = oclRule.evaluate();
            expect(actual).to.be.true;
        });

        it('should evaluate multiply.', () => {
            const oclExpression = `
            context Object inv:
                -2.5 * 2 = -5
       `;

            const oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate();
            expect(actual).to.be.true;
        });

        it('should evaluate modulo.', () => {
            const oclExpression = `
            context Object inv:
                7 mod 4 = 3
       `;

            const oclRule = OclParser.parse(oclExpression);
            let actual = oclRule.evaluate();
            expect(actual).to.be.true;
        });
    });
});