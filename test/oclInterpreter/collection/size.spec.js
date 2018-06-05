'use strict';
import { expect } from "chai";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('Collection->size', () => {
    it('should return the correct length of a given array', () => {
        const oclExpression = `
            context Object inv:
                self.seq->size() = 3
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({ seq: [1,2,3] })).to.be.true;
    });

    it('should not break when seq is not defined or not an array', () => {
        const oclExpression = `
            context Object inv:
                self.seq->size() = 0
        `;

        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({  })).to.be.true;
    });
});