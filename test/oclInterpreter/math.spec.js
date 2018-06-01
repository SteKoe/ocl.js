'use strict';
import {expect} from "chai";

require('../../generator/oclParserGenerator');
import {OclParser} from "../../lib/components/parser/OclParser";

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