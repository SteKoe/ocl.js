import {expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue} from '../../matcher'
import {FixtureFactory} from "../../fixture.factory";

describe('Collection->exists', () => {
    const mother = FixtureFactory.createPerson('Hilde');
    mother.children = [
        FixtureFactory.createPerson('A', 1),
        FixtureFactory.createPerson('B', 9),
        FixtureFactory.createPerson('C', 18)
    ];

    it('should evaluate exists() using iterator', () => {
        let oclExpression = `context Person inv: self.children->exists(c|c.age > 20)`;
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should evaluate exists() without iterator', () => {
        const oclExpression = `context Person inv: self.children->exists(age > 20)`;
        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should return names for all children when using chained attributes', () => {
        const oclExpression = `
            context Person inv:
                self.children.name->exists(n | n = "A") and
                self.children.name->exists(n | n = "B") and
                self.children.name->exists(n | n = "D")
       `;

        expectOclRuleValidatesToFalse(oclExpression, mother);
    });

    it('should check if there are underAged customers', () => {
        let obj = {
            customer: [
                {underAge: false},
                {underAge: true}
            ]
        };

        const oclExpression = `context Object inv: self.customer->exists(underAge = true)`;
        expectOclRuleValidatesToTrue(oclExpression, obj);
    });
});