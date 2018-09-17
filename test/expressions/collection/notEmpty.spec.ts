import { expectOclRuleValidatesToTrue } from '../../matcher';

describe('Collection->notEmpty', () => {
    it('should return an element from within the sequence', () => {
        const obj = {seq: [1, 2, 3]};
        const oclExpression = 'context Object inv: self.seq->notEmpty() = true';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should return nothing ', () => {
        const obj = {seq: []};
        const oclExpression = 'context Object inv: self.seq->notEmpty() = false';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
