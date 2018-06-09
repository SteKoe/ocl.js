import {expectOclRuleValidatesToTrue} from '../matcher'

describe('VariableExpression', () => {
    it('returns simple value', () => {
        let obj = {a: 12};
        let oclExpression = `context Object inv: self.a = 12`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});