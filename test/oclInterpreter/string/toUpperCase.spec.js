'use strict';
import { expect } from "chai";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('String->toUpperCase', () => {
    it('should return string in upper case', () => {
        const oclExpression = `
            context Object inv:
                self.name->toUpperCase() = "STEPHAN"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: "Stephan" })).to.be.true;
    });
});