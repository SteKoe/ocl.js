import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../../matcher';

describe('and', () => {
    it('true and true', () => {
        const oclExpression = 'context Object inv: true and true';
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('true and false', () => {
        const oclExpression = 'context Object inv: true and false';
        expectOclRuleValidatesToFalse(oclExpression);
    });

    it('false and true', () => {
        const oclExpression = 'context Object inv: false and true';
        expectOclRuleValidatesToFalse(oclExpression);
    });

    it('false and false', () => {
        const oclExpression = 'context Object inv: false and false';
        expectOclRuleValidatesToFalse(oclExpression);
    });
});
