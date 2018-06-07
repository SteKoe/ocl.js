import { expect } from "chai";
import { expectOclRuleValidatesToFalse, expectOclRuleValidatesToTrue } from '../../matcher'

describe('xor', () => {
    it('true xor true', () => {
        let oclExpression = `context Object inv: true xor true`;
        expectOclRuleValidatesToFalse(oclExpression)
    });

    it('true xor false', () => {
        let oclExpression = `context Object inv: true xor false`;
        expectOclRuleValidatesToTrue(oclExpression)
    });

    it('false xor true', () => {
        let oclExpression = `context Object inv: false xor true`;
        expectOclRuleValidatesToTrue(oclExpression)
    });

    it('false xor false', () => {
        let oclExpression = `context Object inv: false xor false`;
        expectOclRuleValidatesToFalse(oclExpression)
    });
});

