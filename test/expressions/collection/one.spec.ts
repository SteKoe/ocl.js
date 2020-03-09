import { expectOclRuleValidatesToTrue } from '../../matcher';

describe('Collection->one ', () => {
    it('should return true if there is exactly one matching element', () => {
        const oclExpression = 'context Object inv: self->one(a < 1) = true';
        expectOclRuleValidatesToTrue(oclExpression, [1.2, 2.3, 5.2, 0.9]);
    });

    it('should return false if there is more than one matching element', () => {
        const oclExpression = 'context Object inv: self->one(a < 2) = false';
        expectOclRuleValidatesToTrue(oclExpression, [1.2, 2.3, 5.2, 0.9]);
    });

    it('should return false if there is no matching element', () => {
        const oclExpression = 'context Object inv: self->one(a < 0) = false';
        expectOclRuleValidatesToTrue(oclExpression, [1.2, 2.3, 5.2, 0.9]);
    });

    it('should return false if there is no matching property in object', () => {
        const oclExpression = 'context Object inv: self->one(obj | obj.a > 0) = true';
        expectOclRuleValidatesToTrue(oclExpression, [
            {a: 1},
            {c: 2},
            {b: 3}
        ]);
    });
});
