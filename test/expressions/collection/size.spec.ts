import { expectOclRuleValidatesToTrue } from '../../matcher';

describe('Collection->size', () => {
    it('should return the correct length of a given array', () => {
        const obj = {seq: [1, 2, 3]};
        const oclExpression = 'context Object inv: self.seq->size() = 3';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should not break when seq is not defined or not an array', () => {
        const obj = {};
        const oclExpression = 'context Object inv: self.seq->size() = 0';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('should execute function calls without braces', () => {
        const obj = {seq: [1, 2, 3]};
        const oclExpression = 'context Object inv: self.seq->size = 3';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
