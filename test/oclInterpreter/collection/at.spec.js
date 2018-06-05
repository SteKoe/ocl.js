'use strict';
import { expect } from "chai";
import { FixtureFactory } from "./../../fixture.factory.js";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('Collection->at', () => {
    it('should return an element from within the sequence', () => {
        const oclExpression = `context Object inv: self.seq->at(2) = 2`;
        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({seq: [1,2,3]})).to.be.true;
    });

    it('should return nothing ', () => {
        const oclExpression = `context Object inv: self.seq->at(0) = 1`;
        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({seq: [1,2,3]})).to.be.false;
    });
});