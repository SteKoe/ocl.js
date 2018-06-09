import {FixtureFactory} from "../fixture.factory";
import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../matcher'

describe('oclIsTypeOf', () => {
    const mother = FixtureFactory.createPerson('Hilde');

    it('evaluates correctly if type is given as string', () => {
        let oclExpression = `context Person inv: self->oclIsTypeOf("Person")`;
        expectOclRuleValidatesToTrue(oclExpression, mother);

        oclExpression = `context Person inv: self->oclIsTypeOf("Entity")`;
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });
});

