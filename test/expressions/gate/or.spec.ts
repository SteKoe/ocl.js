import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../../matcher';

describe('or', () => {
    it('true or true', () => {
        const oclExpression = 'context Object inv: true or true';
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('true or false', () => {
        const oclExpression = 'context Object inv: true or false';
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('false or true', () => {
        const oclExpression = 'context Object inv: false or true';
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('false or false', () => {
        const oclExpression = 'context Object inv: false or false';
        expectOclRuleValidatesToFalse(oclExpression);
    });
});
