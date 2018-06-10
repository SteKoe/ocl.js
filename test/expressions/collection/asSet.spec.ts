import { expectOclRuleValidatesToTrue } from '../../matcher';

describe('Collection->asSet', () => {
    it('should return a set', () => {
        const obj = {seq: [1, 2, 2, 3, 3, 3]};
        const oclExpression = 'context Object inv: self.seq->asSet()->size() = 3';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
