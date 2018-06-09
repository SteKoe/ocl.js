import {OclParser} from "../../../lib/components/parser/OclParser";
import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../../matcher'

describe('Collection->at', () => {
    it('should return an element from within the sequence', () => {
        let obj = {seq: [1, 2, 3]};
        const oclExpression = `context Object inv: self.seq->at(2) = 2`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should return nothing ', () => {
        let obj = {seq: [1, 2, 3]};
        const oclExpression = `context Object inv: self.seq->at(0) = 1`;
        const oclRule = OclParser.parse(oclExpression);
        expectOclRuleValidatesToFalse(oclExpression, obj);
    });
});