import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../../matcher';

describe('xor', () => {
    it('true xor true', () => {
        const oclExpression = 'context Object inv: true xor true';
        expectOclRuleValidatesToFalse(oclExpression);
    });

    it('true xor false', () => {
        const oclExpression = 'context Object inv: true xor false';
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('false xor true', () => {
        const oclExpression = 'context Object inv: false xor true';
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('false xor false', () => {
        const oclExpression = 'context Object inv: false xor false';
        expectOclRuleValidatesToFalse(oclExpression);
    });
});
