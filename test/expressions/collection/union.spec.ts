import { expectOclRuleValidatesToTrue } from '../../matcher';

describe('Collection->union', () => {
    it('sums up the numbers', () => {
        const obj = {
            a: [1, 2],
            b: [3, 4]
        };
        const oclExpression = 'context Object inv: self.a->union(self.b)->size() = 4';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
