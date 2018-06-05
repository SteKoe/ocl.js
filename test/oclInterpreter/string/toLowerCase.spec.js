'use strict';
import { expect } from "chai";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('String->toLowerCase', () => {
    it('should return string in lower case', () => {
        const oclExpression = `
            context Object inv:
                self.name->toLowerCase() = "stephan"
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ name: "StEpHaN" })).to.be.true;
    });
});