import {FixtureFactory} from '../../fixture.factory';
import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../../matcher';

describe('Collection->forAll', () => {
    const mother = FixtureFactory.createPerson('Hilde', 50);

    it('should evaluate forAll(c|...): negative', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 10),
            FixtureFactory.createPerson('B', 50)
        ];

        const oclExpression = 'context Person inv ChildrenAreAllYounger: self.children->forAll(c|c.age < self.age)';
        expectOclRuleValidatesToFalse(oclExpression, mother);

    });

    it('should evaluate forAll(c|...): positive', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 10),
            FixtureFactory.createPerson('B', 40)
        ];

        const oclExpression = 'context Person inv: self.children->forAll(c|c.age < self.age)';
        expectOclRuleValidatesToTrue(oclExpression, mother);

    });

    it('should evaluate forAll(c1,c2|...): positive', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 3),
            FixtureFactory.createPerson('D', 4),
            FixtureFactory.createPerson('E', 5)
        ];

        const oclExpression = 'context Person inv: self.children->forAll(c1, c2|c1.age <> c2.age)';
        expectOclRuleValidatesToTrue(oclExpression, mother);
    });

    it('should evaluate forAll(c1,c2|...): negative', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 2),
            FixtureFactory.createPerson('D', 4),
            FixtureFactory.createPerson('E', 5)
        ];

        const oclExpression = 'context Person inv: self.children->forAll(c1, c2|c1.age <> c2.age)';
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should iterate over collected items without having a collector', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 4),
            FixtureFactory.createPerson('D', 8),
            FixtureFactory.createPerson('E', 10)
        ];

        const oclExpression = 'context Person inv: self.children->forAll(age < 10)';
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });
});
