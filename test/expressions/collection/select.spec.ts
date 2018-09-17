import {FixtureFactory} from '../../fixture.factory';
import {expectOclRuleValidatesToTrue} from '../../matcher';

describe('Collection->select ', () => {
    const mother = FixtureFactory.createPerson('Hilde', 50);

    it('should parse select', () => {
        const oclExpression = 'context Object inv: self.a->select(a | a < 2)->size = 1';
        expectOclRuleValidatesToTrue(oclExpression, {a: [1, 4]});
    });

    it('should parse select without iterator', () => {
        const oclExpression = 'context Object inv: self.a->select(b < 2)->size = 1';
        expectOclRuleValidatesToTrue(oclExpression, {a: [1, 4]});
    });

    it('should evaluate select()', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 4),
            FixtureFactory.createPerson('D', 8),
            FixtureFactory.createPerson('E', 10)
        ];

        const oclExpression = 'context Person inv: self.children->select(c|c.age < 10)->size() = 4';
        expectOclRuleValidatesToTrue(oclExpression, mother);

    });

    it('should iterate over collected items', () => {
        mother.children = [
            FixtureFactory.createPerson('A', 1),
            FixtureFactory.createPerson('B', 2),
            FixtureFactory.createPerson('C', 4),
            FixtureFactory.createPerson('D', 8),
            FixtureFactory.createPerson('E', 10)
        ];

        const oclExpression = 'context Person inv: self.children->select(c|c.age < 10)->forAll(c|c.age<10)';
        expectOclRuleValidatesToTrue(oclExpression, mother);
    });
});
