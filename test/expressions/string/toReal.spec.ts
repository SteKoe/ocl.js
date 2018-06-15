import { expectOclRuleValidatesToTrue } from '../../matcher';

describe('toReal', () => {
    it('parses a string to real (float)', () => {
        const obj = {};
        const oclExpression = 'context Object inv: "3.414".toReal() = 3.414';
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});
