import { expect } from "chai";
import { expectOclRuleValidatesToTrue } from '../../matcher'

describe('Collection->isEmpty', () => {
    it('should return an element from within the sequence', () => {
        let obj = { seq: [1, 2, 3] };
        const oclExpression = `context Object inv: self.seq->isEmpty() = false`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should return nothing ', () => {
        let obj = { seq: [] };
        const oclExpression = `context Object inv: self.seq->isEmpty() = true`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});