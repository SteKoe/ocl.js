import {expectOclRuleValidatesToTrue} from '../../matcher';

describe('Collection->last', () => {
    it('should return the last element of a seq', () => {
        const obj = {seq: [1, 2, 3]};
        const oclExpression = 'context Object inv: self.seq->last() = 3';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should not break when called on non sequence', () => {
        const obj = {};
        const oclExpression = 'context Object inv: self.seq->last() = Nil';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
