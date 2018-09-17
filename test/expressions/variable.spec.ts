import {expectOclRuleValidatesToTrue} from '../matcher';

describe('VariableExpression', () => {
    it('returns simple value', () => {
        const obj = {a: 12};
        const oclExpression = 'context Object inv: self.a = 12';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
