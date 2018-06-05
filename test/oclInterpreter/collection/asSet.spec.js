'use strict';
import { expect } from "chai";
import { FixtureFactory } from "./../../fixture.factory.js";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('Collection->asSet', () => {
    it('should return a set', () => {
        const oclExpression = `context Object inv: self.seq->asSet()->size() = 3`;
        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({seq: [1,2,2,3,3,3]})).to.be.true;
    });
});