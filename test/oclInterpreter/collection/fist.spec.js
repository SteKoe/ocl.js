'use strict';
import { expect } from "chai";
import { FixtureFactory } from "./../../fixture.factory.js";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('Collection->first', () => {
    it('should return the first element of a seq', () => {
        const oclExpression = `context Object inv: self.seq->first() = 1`;
        const oclRule = OclParser.parse(oclExpression);
        expect(oclRule.evaluate({seq: [1,2,3]})).to.be.true;
    });

    it('should not break when called on non sequence', () => {
        let oclRule = OclParser.parse(`context Object inv: self.seq->first() = Nil`);
        expect(oclRule.evaluate({})).to.be.true;

        oclRule = OclParser.parse(`context Object inv: self.seq->first() = Nil`);
        expect(oclRule.evaluate({seq: {}})).to.be.true;
    });
});