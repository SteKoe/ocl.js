import {expectOclRuleValidatesToTrue} from '../../matcher'

describe('toReal', () => {
    it('parses a string to real (float)', () => {
        let obj = {};
        let oclExpression = `context Object inv: "3.414"->toReal() = 3.414`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
