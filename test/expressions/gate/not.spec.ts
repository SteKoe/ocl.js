import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../../matcher';

describe('not', () => {
    it('not true => false', () => {
        const oclExpression = 'context Object inv notExpression: not true';
        expectOclRuleValidatesToFalse(oclExpression);
    });

    it('not false => true', () => {
        const oclExpression = 'context Object inv notExpression: not false';
        expectOclRuleValidatesToTrue(oclExpression);
    });
});
