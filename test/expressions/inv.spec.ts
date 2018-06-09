import {FixtureFactory, MetaAttribute} from "../fixture.factory";
import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../matcher'

describe('inv', () => {
    const mother = FixtureFactory.createPerson('Hilde', 50);

    it('should evaluate self.parents->forAll(p | p <> self)', () => {
        const oclExpression = `context Person inv: self.parents->forAll(p | p <> self)`;
        expectOclRuleValidatesToTrue(oclExpression, mother);

        // Now set self to parent
        mother.parents.push(mother);
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should evaluate boolean expression with braces.', () => {
        const obj = new MetaAttribute();
        obj.minCard = 0;
        obj.maxCard = 10;

        const oclExpression = `context MetaAttribute inv: self.minCard <= self.maxCard or (self.minCard = nil and self.maxCard = nil)`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });

    it('size should return array size', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 4),
            FixtureFactory.createPerson('D', 8)
        ];

        const oclExpression = `context Person inv: self.children->size() = 4`;
        expectOclRuleValidatesToTrue(oclExpression, mother);
    });

    it('size should return array size II', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 4),
            FixtureFactory.createPerson('D', 8)
        ];

        const oclExpression = `
            context Person 
                inv: self.children->size() = 4
                inv: self.children->isEmpty()
           `;

        expectOclRuleValidatesToFalse(oclExpression, mother);
    });
});
