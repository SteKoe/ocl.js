import { expect } from "chai";
import { expectOclRuleValidatesToTrue } from '../../matcher'

describe('Collection->first', () => {
    it('should return the last element of a seq', () => {
        let obj = { seq: [1, 2, 3] };
        const oclExpression = `context Object inv: self.seq->first() = 1`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should not break when called on non sequence', () => {
        let obj = {};
        let oclExpression = `context Object inv: self.seq->first() = Nil`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});