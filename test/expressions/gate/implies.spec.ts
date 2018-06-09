import {FixtureFactory} from "../../fixture.factory";
import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../../matcher'

describe('implies', () => {
    const mother = FixtureFactory.createPerson('Hilde', 50);

    it('should evaluate implies: positive', () => {
        const oclExpression = `context Person inv: self.age > 0 implies self.age <> 0`;
        expectOclRuleValidatesToTrue(oclExpression, mother);
    });

    it('should evaluate implies: negative', () => {
        const oclExpression = `context Person inv: self.age > 0 implies self.age = 0`;
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should evaluate implies with more complex expressions', () => {
        const oclExpression = `context Person inv: self.name->isNotEmpty() implies self.name <> ""`;
        expectOclRuleValidatesToTrue(oclExpression, mother);
    });
});
