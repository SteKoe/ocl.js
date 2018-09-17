import {expectOclRuleValidatesToTrue} from '../../matcher';

describe('Collection->sum', () => {
    it('sums up the numbers', () => {
        const obj = {a: [1, 2, 3, 4]};
        const oclExpression = 'context Object inv: self.a->sum() = 10';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('returns the sum of the child\'s ages', () => {
        const obj = {
            children: [
                {age: 29},
                {age: 31},
                {age: 33}
            ]
        };
        const oclExpression = 'context Object inv: self.children.age->sum() = 93';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
