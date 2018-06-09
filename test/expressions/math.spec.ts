import {expectOclRuleValidatesToTrue} from '../matcher'

describe('Math', () => {
    it('should evaluate addition.', () => {
        let oclExpression = `context Object inv: 1 + 2 = 3`;
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('should evaluate complexer math.', () => {
        const positiveFixtures = [
            `context Object inv: 1 + 2 * 3 = 7`,
            `context Object inv: (1 + 2) * 3 = 9`,
            `context Object inv: 2^2 = 4`,
            `context Object inv: -2^2 = 4`,
            `context Object inv: -(2^2) = -4`,
            `context Object inv: (0.2 * 10 + 0.1 * 10) / 10 = 0.3`,
            `context Object inv: ((1 + 2) * 3) + 6 = 15`,
            `context Object inv: ((1 + 2) * 3) ^ 2 + 9 = 90`,
            `context Object inv: (((1 + 2) * 3) ^ 2 + 9) / 3 = 30`
        ];

        positiveFixtures.forEach(fixture => expectOclRuleValidatesToTrue(fixture));
    });

    it('should evaluate substraction.', () => {
        const oclExpression = ` context Object inv: 1.0 - 2 = -1`;
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('should evaluate division.', () => {
        const oclExpression = `context Object inv: 10 / 2 = 5`;
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('should evaluate division using div.', () => {
        const oclExpression = `context Object inv: 10 div 5 = 2`;
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('should evaluate multiply.', () => {
        const oclExpression = `context Object inv: -2.5 * 2 = -5`;
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('should evaluate modulo.', () => {
        const oclExpression = `context Object inv: 7 mod 4 = 3`;
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('should evaluate abs.', () => {
        const oclExpression = `context Object inv: -2->abs() = 2`;
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('should evaluate sqrt.', () => {
        const oclExpression = `context Object inv: 9->sqrt() = 3`;
        expectOclRuleValidatesToTrue(oclExpression);
    });

    it('should evaluate sqrt with n.', () => {
        const oclExpression = `context Object inv: 729->sqrt(3) = 8.999999999999998`;
        expectOclRuleValidatesToTrue(oclExpression);
    });
});