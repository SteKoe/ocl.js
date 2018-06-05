'use strict';
import { expect } from "chai";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('String->size', () => {
    it('should return the correct length of a given string', () => {
        const oclExpression = `
            context Object inv:
                self.name->size() = 7
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: "Stephan" })).to.be.true;
    });
});