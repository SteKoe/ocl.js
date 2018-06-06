import { expect } from "chai";
import { FixtureFactory } from "./../../fixture.factory.js";
import { OclParser } from "../../../lib/components/parser/OclParser";
import { expectOclRuleValidatesToTrue } from '../../matcher'

describe('Collection->asSet', () => {
    it('should return a set', () => {
        let obj = {seq: [1,2,2,3,3,3]};
        const oclExpression = `context Object inv: self.seq->asSet()->size() = 3`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});