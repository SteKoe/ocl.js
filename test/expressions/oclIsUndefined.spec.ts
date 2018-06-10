import { FixtureFactory } from '../fixture.factory';
import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../matcher';

describe('oclIsUndefined', () => {
    const mother = FixtureFactory.createPerson('Hilde');

    it('should return false if is defined', () => {
        const oclExpression = 'context Person inv: self.name.oclIsUndefined()';
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should return true if is undefined', () => {
        const oclExpression = 'context Person inv: self.undefinedProperty.oclIsUndefined()';
        expectOclRuleValidatesToTrue(oclExpression, mother);
    });
});
