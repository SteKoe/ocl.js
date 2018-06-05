'use strict';
import { expect } from "chai";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('String->substring', () => {
    it('should return substring specifing start and end', () => {
        const oclExpression = `
            context Object inv:
                self.name->substring(0,2) = "St"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: "Stephan" })).to.be.true;
    });

    it('should return substring specifing only start', () => {
        const oclExpression = `
            context Object inv:
                self.name->substring(2) = "ephan"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: "Stephan" })).to.be.true;
    });


    it('should return whole string when omitting params', () => {
        const oclExpression = `
            context Object inv:
                self.name->substring() = "Stephan"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: "Stephan" })).to.be.true;
    });
});