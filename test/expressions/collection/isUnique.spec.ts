import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../../matcher';

describe('Collection->isUnique', () => {
    it('works using no body', () => {
        const fromOclSpec = [2.3, 5.2];

        const oclExpression = 'context Object inv: self->isUnique()';
        expectOclRuleValidatesToTrue(oclExpression, fromOclSpec);
    });
    
    it('works using comparator', () => {
        const fromOclSpec = [2.3, 5.2];

        let oclExpression = 'context Object inv: self->isUnique(self > 3)';
        expectOclRuleValidatesToTrue(oclExpression, fromOclSpec);

        oclExpression = 'context Object inv: self->isUnique(self > 1)';
        expectOclRuleValidatesToFalse(oclExpression, fromOclSpec);
    });

    it('works checking just for self', () => {
        const stringArray = ['A', 'B', 'C', 'D'];

        const oclExpression = 'context Object inv: self->isUnique(self)';
        expectOclRuleValidatesToTrue(oclExpression, stringArray);

        stringArray.push('A');
        expectOclRuleValidatesToFalse(oclExpression, stringArray);
    });
});
