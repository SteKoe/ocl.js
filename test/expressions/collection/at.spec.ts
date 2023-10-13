import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../../matcher';

describe('Collection->at', () => {
    it('should return an element from within the sequence', () => {
        const obj = {seq: [1, 2, 3]};
        const oclExpression = 'context Object inv: self.seq->at(2) = 2';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should return the element even if there is just one', () => {
        const obj = {seq: [1]};
        const oclExpression = 'context Object inv: self.seq->at(1) = 1';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should return nothing when index is 0', () => {
        const obj = {seq: [1, 2, 3]};
        const oclExpression = 'context Object inv: self.seq->at(0) = 1';
        expectOclRuleValidatesToFalse(oclExpression, obj);
    });

    it('should return nothing when index is out of bounds', () => {
        const obj = {seq: [1, 2, 3]};
        const oclExpression = 'context Object inv: self.seq->at(100) = 1';
        expectOclRuleValidatesToFalse(oclExpression, obj);
    });
});
