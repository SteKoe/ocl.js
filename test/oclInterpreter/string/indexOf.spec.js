'use strict';
import { expect } from "chai";
import { OclParser } from "../../../lib/components/parser/OclParser";

require('../../../generator/oclParserGenerator');

describe('String->indexOf', () => {
    it('should find index positions according to the ocl specification', () => {
        let oclRule = OclParser.parse(`context Object inv: self.name->indexOf("S") = 1`);
        expect(oclRule.evaluate({ name: "Stephan" }, "S is first char in Steohan")).to.be.true;

        oclRule = OclParser.parse(`context Object inv: self.name->indexOf("K") = 0`);
        expect(oclRule.evaluate({ name: "Stephan" }, "K in Stephan not contained")).to.be.true;

        oclRule = OclParser.parse(`context Object inv: self.name->indexOf("") = 0`);
        expect(oclRule.evaluate({ name: "Stephan" }), "'' is at position 0").to.be.true;
    });
});